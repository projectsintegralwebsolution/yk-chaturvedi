"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Code,
  Eye,
  Edit3,
  Code2,
  Minus,
  AlertTriangle,
  Info,
  CheckCircle,
  Upload,
  Eraser,
  ChevronDown,
} from "lucide-react";

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RichEditor: React.FC<RichEditorProps> = ({ value, onChange }) => {
  const [activeTab, setActiveTab] = useState<"visual" | "html" | "preview">("visual");
  const visualEditorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorFileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingInlineImage, setIsUploadingInlineImage] = useState(false);
  const [currentBlockFormat, setCurrentBlockFormat] = useState<string>("p");
  const isUpdatingFromProps = useRef(false);

  // Sync value into contentEditable when switching back to Visual tab or on initial load
  useEffect(() => {
    if (activeTab === "visual" && visualEditorRef.current) {
      if (visualEditorRef.current.innerHTML !== (value || "")) {
        isUpdatingFromProps.current = true;
        visualEditorRef.current.innerHTML = value || "";
        isUpdatingFromProps.current = false;
      }
    }
  }, [activeTab]);

  // When visual editor content changes
  const handleVisualInput = () => {
    if (isUpdatingFromProps.current) return;
    if (visualEditorRef.current) {
      const html = visualEditorRef.current.innerHTML;
      onChange(html);
    }
  };

  // Stats calculation
  const cleanText = (value || "").replace(/<[^>]*>?/gm, " ").trim();
  const wordCount = cleanText ? cleanText.split(/\s+/).filter(Boolean).length : 0;
  const charCount = cleanText.length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // Executive formatting command helper
  const execCmd = (command: string, value: string | undefined = undefined) => {
    if (activeTab !== "visual") {
      setActiveTab("visual");
      setTimeout(() => execCmd(command, value), 50);
      return;
    }

    if (visualEditorRef.current) {
      visualEditorRef.current.focus();
    }
    document.execCommand(command, false, value);
    handleVisualInput();
  };

  // Format Block for Headings (H1 to H6, p, blockquote)
  const formatHeading = (tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p") => {
    if (activeTab !== "visual") {
      setActiveTab("visual");
    }

    setTimeout(() => {
      if (visualEditorRef.current) {
        visualEditorRef.current.focus();
      }
      try {
        // Try standard formatBlock
        document.execCommand("formatBlock", false, `<${tag.toUpperCase()}>`);
      } catch (err) {
        try {
          document.execCommand("formatBlock", false, tag);
        } catch (e) {
          console.error(e);
        }
      }
      setCurrentBlockFormat(tag);
      handleVisualInput();
    }, 20);
  };

  // Insert HTML directly at selection cursor
  const insertHTMLAtCursor = (html: string) => {
    if (activeTab === "html") {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText =
        textarea.value.substring(0, start) + html + textarea.value.substring(end);
      onChange(newText);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + html.length, start + html.length);
      }, 0);
      return;
    }

    // In Visual mode:
    if (visualEditorRef.current) {
      visualEditorRef.current.focus();
    }
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const el = document.createElement("div");
      el.innerHTML = html;
      const frag = document.createDocumentFragment();
      let node: ChildNode | null;
      let lastNode: ChildNode | null = null;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);
      if (lastNode) {
        range.setStartAfter(lastNode);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      handleVisualInput();
    } else {
      execCmd("insertHTML", html);
    }
  };

  // Upload image from computer into article content
  const handleEditorFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingInlineImage(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to upload image.");
        setIsUploadingInlineImage(false);
        return;
      }

      const defaultAlt = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      const alt = prompt("Enter Image Alt Description (important for SEO):", defaultAlt) || defaultAlt;
      const imgHtml = `\n<figure class="my-6 rounded-2xl overflow-hidden border border-slate-200 shadow-sm"><img src="${data.url}" alt="${alt}" class="w-full h-auto max-h-[480px] object-cover" /><figcaption class="text-xs text-center text-slate-500 py-2.5 bg-slate-50 border-t border-slate-100 font-medium">${alt}</figcaption></figure>\n<p><br /></p>`;
      insertHTMLAtCursor(imgHtml);
    } catch (err) {
      alert("Error uploading image from computer.");
    } finally {
      setIsUploadingInlineImage(false);
      if (editorFileInputRef.current) editorFileInputRef.current.value = "";
    }
  };

  const handleInsertLink = () => {
    const url = prompt("Enter target hyperlink URL:", "https://");
    if (!url) return;
    const text = prompt("Enter anchor link text (or leave blank to use selected text):", "");
    if (text) {
      insertHTMLAtCursor(
        `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline font-semibold hover:text-navy-950">${text}</a>`
      );
    } else {
      execCmd("createLink", url);
    }
  };

  const handleInsertImageViaUrl = () => {
    const url = prompt("Enter Image URL (e.g. Unsplash or hosted image):", "https://images.unsplash.com/photo-");
    if (!url) return;
    const alt = prompt("Enter Image Alt Text (for Google Image SEO):", "Chartered accountant statutory documentation");
    const imgHtml = `\n<figure class="my-6 rounded-2xl overflow-hidden border border-slate-200 shadow-sm"><img src="${url}" alt="${alt || ""}" class="w-full h-auto max-h-[480px] object-cover" />${alt ? `<figcaption class="text-xs text-center text-slate-500 py-2.5 bg-slate-50 border-t border-slate-100 font-medium">${alt}</figcaption>` : ""}</figure>\n<p><br /></p>`;
    insertHTMLAtCursor(imgHtml);
  };

  const handleInsertTable = () => {
    const tableTemplate = `\n<div class="overflow-x-auto my-6 rounded-xl border border-slate-200 shadow-sm break-words [overflow-wrap:anywhere]"><table class="w-full text-left border-collapse text-xs sm:text-sm"><thead><tr class="bg-navy-950 text-white font-semibold"><th class="p-3 border-r border-navy-900">Statutory Particulars</th><th class="p-3 border-r border-navy-900">Regulatory Requirement</th><th class="p-3">Statutory Deadline</th></tr></thead><tbody class="divide-y divide-slate-200 text-slate-700 bg-white"><tr><td class="p-3 font-semibold text-navy-950 border-r border-slate-100">GSTR-1 Monthly Filing</td><td class="p-3 border-r border-slate-100">Outward supplies return for turnover &gt; ₹5 Cr</td><td class="p-3 font-mono text-slate-600">11th of succeeding month</td></tr><tr class="bg-slate-50/50"><td class="p-3 font-semibold text-navy-950 border-r border-slate-100">GSTR-3B Summary Return</td><td class="p-3 border-r border-slate-100">Monthly tax payment &amp; ITC claim</td><td class="p-3 font-mono text-slate-600">20th of succeeding month</td></tr><tr><td class="p-3 font-semibold text-navy-950 border-r border-slate-100">Form 3CD Tax Audit</td><td class="p-3 border-r border-slate-100">Audit report under Section 44AB</td><td class="p-3 font-mono text-slate-600">30th September</td></tr></tbody></table></div>\n<p><br /></p>`;
    insertHTMLAtCursor(tableTemplate);
  };

  const handleInsertCallout = (type: "info" | "warning" | "success") => {
    let classes = "";
    let title = "";
    if (type === "info") {
      classes = "bg-blue-50/90 border-l-4 border-blue-600 text-slate-800 p-4 rounded-r-xl my-5";
      title = "Key Statutory Note";
    } else if (type === "warning") {
      classes = "bg-amber-50/90 border-l-4 border-amber-500 text-slate-800 p-4 rounded-r-xl my-5";
      title = "Important Compliance Warning";
    } else {
      classes = "bg-emerald-50/90 border-l-4 border-emerald-600 text-slate-800 p-4 rounded-r-xl my-5";
      title = "Best Practice Recommendation";
    }
    const html = `\n<div class="${classes} break-words [overflow-wrap:anywhere]"><strong class="block text-navy-950 font-bold mb-1 text-sm">${title}</strong><p class="text-xs sm:text-sm text-slate-700 m-0">Write regulatory citation, statutory deadline, or practical advice here...</p></div>\n<p><br /></p>`;
    insertHTMLAtCursor(html);
  };

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col">
      {/* Hidden file input for inline computer image upload */}
      <input
        type="file"
        ref={editorFileInputRef}
        onChange={handleEditorFileUpload}
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/avif"
        className="hidden"
      />

      {/* WordPress-style Sticky Formatting Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 sm:p-2.5 flex flex-wrap items-center justify-between gap-2 select-none">
        {/* Left Formatting Group */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* 1. All 6 Headings Dropdown + Quick Buttons */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-xs">
            <select
              value={currentBlockFormat}
              onChange={(e) => formatHeading(e.target.value as any)}
              className="px-2.5 py-1 text-xs font-bold text-navy-950 bg-transparent border-r border-slate-200 focus:outline-none cursor-pointer"
              title="Select Heading Level (H1 - H6 or Paragraph)"
            >
              <option value="p">Paragraph (Normal)</option>
              <option value="h1">Heading 1 (H1 - Major Title)</option>
              <option value="h2">Heading 2 (H2 - Section)</option>
              <option value="h3">Heading 3 (H3 - Subsection)</option>
              <option value="h4">Heading 4 (H4 - Topic)</option>
              <option value="h5">Heading 5 (H5 - Minor)</option>
              <option value="h6">Heading 6 (H6 - Small)</option>
            </select>

            {/* Quick 1-click pills for all 6 headings */}
            <div className="flex items-center px-1 gap-0.5">
              {(["h1", "h2", "h3", "h4", "h5", "h6"] as const).map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => formatHeading(h)}
                  title={`Format as ${h.toUpperCase()}`}
                  className="px-1.5 py-0.5 rounded text-[11px] font-bold text-slate-700 hover:text-navy-950 hover:bg-slate-100 transition"
                >
                  {h.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Inline Text Formats (B, I, U, S) */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-xs">
            <button
              type="button"
              onClick={() => execCmd("bold")}
              title="Bold (Ctrl+B)"
              className="p-1.5 rounded hover:bg-slate-100 text-slate-700 transition"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCmd("italic")}
              title="Italic (Ctrl+I)"
              className="p-1.5 rounded hover:bg-slate-100 text-slate-700 transition"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCmd("underline")}
              title="Underline (Ctrl+U)"
              className="p-1.5 rounded hover:bg-slate-100 text-slate-700 transition"
            >
              <UnderlineIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCmd("strikeThrough")}
              title="Strikethrough"
              className="p-1.5 rounded hover:bg-slate-100 text-slate-700 transition"
            >
              <Strikethrough className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCmd("removeFormat")}
              title="Clear Formatting"
              className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-red-600 transition"
            >
              <Eraser className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3. Lists & Blockquotes */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-xs">
            <button
              type="button"
              onClick={() => execCmd("insertUnorderedList")}
              title="Bullet List"
              className="p-1.5 rounded hover:bg-slate-100 text-slate-700 transition"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCmd("insertOrderedList")}
              title="Numbered List"
              className="p-1.5 rounded hover:bg-slate-100 text-slate-700 transition"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() =>
                insertHTMLAtCursor(
                  '<blockquote class="border-l-4 border-gold-500 pl-4 py-2 italic my-5 bg-gold-50/50 rounded-r-lg text-slate-800 text-sm break-words [overflow-wrap:anywhere]"><p>"Statutory compliance protects enterprise credibility and long-term shareholder value."</p></blockquote><p><br /></p>'
                )
              }
              title="Quote / Pullquote"
              className="p-1.5 rounded hover:bg-slate-100 text-slate-700 transition"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4. Media & Inserts */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-xs">
            <button
              type="button"
              onClick={handleInsertLink}
              title="Insert Link"
              className="p-1.5 rounded hover:bg-slate-100 text-blue-600 transition"
            >
              <LinkIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => editorFileInputRef.current?.click()}
              title="Upload Image from Computer into Article"
              className="p-1.5 rounded hover:bg-slate-100 text-emerald-600 transition"
            >
              {isUploadingInlineImage ? (
                <div className="w-3.5 h-3.5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              type="button"
              onClick={handleInsertImageViaUrl}
              title="Insert Image via Web URL"
              className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition"
            >
              <ImageIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleInsertTable}
              title="Insert Compliance Table"
              className="p-1.5 rounded hover:bg-slate-100 text-gold-600 transition"
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => execCmd("insertHorizontalRule")}
              title="Horizontal Divider Line"
              className="p-1.5 rounded hover:bg-slate-100 text-slate-700 transition"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 5. Statutory Callout Alert Boxes */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-xs">
            <button
              type="button"
              onClick={() => handleInsertCallout("info")}
              title="Insert Statutory Note Callout"
              className="p-1.5 rounded hover:bg-slate-100 text-blue-600 transition"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleInsertCallout("warning")}
              title="Insert Compliance Alert Callout"
              className="p-1.5 rounded hover:bg-slate-100 text-amber-600 transition"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleInsertCallout("success")}
              title="Insert Best Practice Callout"
              className="p-1.5 rounded hover:bg-slate-100 text-emerald-600 transition"
            >
              <CheckCircle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Mode Switcher (Visual vs HTML Code vs Live Preview) */}
        <div className="flex items-center gap-1 bg-slate-200/90 p-0.5 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("visual")}
            className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "visual"
                ? "bg-white text-navy-950 shadow-xs"
                : "text-slate-600 hover:text-navy-950"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5 text-navy-900" />
            <span>Visual</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("html")}
            className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "html"
                ? "bg-white text-navy-950 shadow-xs"
                : "text-slate-600 hover:text-navy-950"
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-gold-600" />
            <span>HTML Code</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === "preview"
                ? "bg-white text-navy-950 shadow-xs"
                : "text-slate-600 hover:text-navy-950"
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-emerald-600" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Content Workspace */}

      {/* TAB 1: VISUAL (TRUE WYSIWYG - NO RAW HTML TAGS VISIBLE) */}
      {activeTab === "visual" && (
        <div className="relative bg-white overflow-hidden">
          <div
            ref={visualEditorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleVisualInput}
            onBlur={handleVisualInput}
            data-placeholder="Start typing your article here... Use the toolbar above to format headings (H1 to H6), bold, lists, and upload images."
            className="w-full p-6 sm:p-8 min-h-[420px] max-h-[750px] overflow-y-auto focus:outline-none text-slate-800 text-base leading-relaxed break-words [overflow-wrap:anywhere] [word-break:break-word] empty:before:content-[attr(data-placeholder)] empty:before:text-slate-300 empty:before:pointer-events-none [&_h1]:text-3xl [&_h1]:font-black [&_h1]:text-navy-950 [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-navy-950 [&_h2]:mt-5 [&_h2]:mb-2.5 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-navy-900 [&_h3]:mt-4 [&_h3]:mb-2 [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-navy-900 [&_h4]:mt-3.5 [&_h4]:mb-1.5 [&_h5]:text-base [&_h5]:font-bold [&_h5]:text-navy-900 [&_h5]:mt-3 [&_h5]:mb-1 [&_h6]:text-sm [&_h6]:font-bold [&_h6]:text-slate-800 [&_h6]:mt-2.5 [&_h6]:mb-1 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5 [&_ol]:mb-4 [&_li]:text-slate-700 [&_blockquote]:border-l-4 [&_blockquote]:border-gold-500 [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:bg-gold-50/40 [&_blockquote]:rounded-r-lg [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_th]:bg-navy-950 [&_th]:text-white [&_th]:p-2.5 [&_td]:border [&_td]:border-slate-200 [&_td]:p-2.5 [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl"
          />
        </div>
      )}

      {/* TAB 2: HTML CODE (RAW HTML SOURCE CODE ONLY) */}
      {activeTab === "html" && (
        <div className="relative bg-slate-950">
          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
            <span>HTML Source Code View</span>
            <span className="text-slate-400">Edit HTML markup directly</span>
          </div>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={18}
            placeholder="<h2>Enter section title</h2>&#10;<p>Article text goes here...</p>"
            className="w-full p-5 font-mono text-xs leading-relaxed focus:outline-none resize-y bg-slate-950 text-emerald-300 min-h-[420px] break-words [overflow-wrap:anywhere] [word-break:break-word]"
          />
        </div>
      )}

      {/* TAB 3: LIVE PREVIEW (EXACT PUBLIC SITE RENDERING WITH WORD-WRAP) */}
      {activeTab === "preview" && (
        <div className="p-6 sm:p-10 bg-slate-50 min-h-[420px] max-h-[750px] overflow-y-auto">
          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 overflow-hidden break-words [overflow-wrap:anywhere] [word-break:break-word]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#0A5084] mb-3 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Live Article Preview</span>
              <span className="text-slate-400">{wordCount} words • {readTimeMinutes} min read</span>
            </div>
            <div
              className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed break-words [overflow-wrap:anywhere] [word-break:break-word] overflow-hidden [&_h1]:text-3xl [&_h1]:sm:text-4xl [&_h1]:font-black [&_h1]:text-navy-950 [&_h1]:mt-8 [&_h1]:mb-3 [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:text-navy-950 [&_h2]:mt-7 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:font-bold [&_h3]:text-navy-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-navy-900 [&_h4]:mt-5 [&_h4]:mb-2 [&_h5]:text-base [&_h5]:font-bold [&_h5]:text-navy-900 [&_h5]:mt-4 [&_h5]:mb-1.5 [&_h6]:text-sm [&_h6]:font-bold [&_h6]:text-slate-800 [&_h6]:mt-4 [&_h6]:mb-1 [&_p]:text-slate-700 [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:break-words [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5 [&_ol]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-gold-500 [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:italic [&_blockquote]:my-4 [&_img]:max-w-full [&_img]:h-auto"
              dangerouslySetInnerHTML={{
                __html:
                  value ||
                  "<p class='text-slate-400 italic text-center py-10'>No content written yet. Switch to Visual mode to compose your article.</p>",
              }}
            />
          </div>
        </div>
      )}

      {/* WordPress-style Status Footer */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-medium">
        <div className="flex items-center gap-4">
          <span>
            Words: <strong className="text-navy-950 font-semibold">{wordCount}</strong>
          </span>
          <span>
            Characters: <strong className="text-navy-950 font-semibold">{charCount}</strong>
          </span>
          <span>
            Reading Time: <strong className="text-navy-950 font-semibold">{readTimeMinutes} min</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          {wordCount >= 300 ? (
            <span className="text-emerald-600 flex items-center gap-1 font-semibold">
              <CheckCircle className="w-3 h-3" />
              SEO Content Length: Great ({wordCount} words)
            </span>
          ) : (
            <span className="text-amber-600 flex items-center gap-1">
              <Info className="w-3 h-3" />
              Tip: Aim for 300+ words for competitive Google ranking
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
