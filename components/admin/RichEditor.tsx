"use client";

import React, { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Code,
  Eye,
  Edit3,
} from "lucide-react";

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RichEditor: React.FC<RichEditorProps> = ({ value, onChange }) => {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertTag = (startTag: string, endTag: string = "", placeholder: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end) || placeholder;
    const replacement = `${startTag}${selectedText}${endTag}`;

    const newValue =
      textarea.value.substring(0, start) +
      replacement +
      textarea.value.substring(end);

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + startTag.length,
        start + startTag.length + selectedText.length
      );
    }, 0);
  };

  const handleInsertLink = () => {
    const url = prompt("Enter URL:", "https://");
    if (url) {
      insertTag(`<a href="${url}" target="_blank" rel="noopener noreferrer">`, "</a>", "Link text");
    }
  };

  const handleInsertImage = () => {
    const url = prompt("Enter image URL:", "https://images.unsplash.com/photo-...");
    const alt = prompt("Enter image alt description:", "Descriptive image caption");
    if (url) {
      insertTag(`<figure class="my-6"><img src="${url}" alt="${alt || ''}" class="rounded-xl w-full object-cover max-h-[450px]" /><figcaption class="text-xs text-center text-slate-500 mt-2">${alt || ''}</figcaption></figure>\n`);
    }
  };

  const handleInsertTable = () => {
    const tableTemplate = `
<table class="w-full text-left border-collapse border border-slate-200 my-6">
  <thead>
    <tr class="bg-slate-100 border-b border-slate-200 text-xs font-bold text-navy-950">
      <th class="p-3 border-r border-slate-200">Particulars</th>
      <th class="p-3 border-r border-slate-200">Compliance Details</th>
      <th class="p-3">Statutory Period</th>
    </tr>
  </thead>
  <tbody class="text-xs divide-y divide-slate-200 text-slate-700">
    <tr>
      <td class="p-3 border-r border-slate-200">Item 1</td>
      <td class="p-3 border-r border-slate-200">Description here</td>
      <td class="p-3">Monthly / Quarterly</td>
    </tr>
    <tr>
      <td class="p-3 border-r border-slate-200">Item 2</td>
      <td class="p-3 border-r border-slate-200">Description here</td>
      <td class="p-3">Annual</td>
    </tr>
  </tbody>
</table>
\n`;
    insertTag(tableTemplate);
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Top Toolbar */}
      <div className="bg-slate-50 p-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => insertTag("<h2>", "</h2>", "Section Heading")}
            title="Heading 2"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 font-bold transition text-xs flex items-center gap-1"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag("<h3>", "</h3>", "Subheading")}
            title="Heading 3"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 font-bold transition text-xs flex items-center gap-1"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-5 bg-slate-300 mx-1" />
          <button
            type="button"
            onClick={() => insertTag("<strong>", "</strong>", "bold text")}
            title="Bold"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag("<em>", "</em>", "italic text")}
            title="Italic"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition"
          >
            <Italic className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-5 bg-slate-300 mx-1" />
          <button
            type="button"
            onClick={() => insertTag("<ul>\n  <li>", "</li>\n  <li>Item 2</li>\n</ul>\n", "Item 1")}
            title="Bullet List"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag("<ol>\n  <li>", "</li>\n  <li>Step 2</li>\n</ol>\n", "Step 1")}
            title="Numbered List"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<blockquote class="border-l-4 border-gold-500 pl-4 py-1 italic my-4 text-slate-600">', "</blockquote>\n", "Quote text")}
            title="Blockquote"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition"
          >
            <Quote className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-5 bg-slate-300 mx-1" />
          <button
            type="button"
            onClick={handleInsertLink}
            title="Insert Link"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleInsertImage}
            title="Insert Image"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleInsertTable}
            title="Insert Table"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition"
          >
            <TableIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Edit / Preview Toggle */}
        <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 ${
              activeTab === "edit"
                ? "bg-white text-navy-950 shadow-sm"
                : "text-slate-600 hover:text-navy-900"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 ${
              activeTab === "preview"
                ? "bg-white text-navy-950 shadow-sm"
                : "text-slate-600 hover:text-navy-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Content Body */}
      {activeTab === "edit" ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={16}
          placeholder="Write your blog article content here using standard formatting tools above..."
          className="w-full p-4 text-sm font-sans text-slate-800 leading-relaxed focus:outline-none resize-y bg-white min-h-[350px]"
        />
      ) : (
        <div className="p-6 bg-slate-50/50 min-h-[350px] max-h-[500px] overflow-y-auto">
          <div
            className="prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: value || "<p class='text-slate-400 italic'>No content to preview.</p>" }}
          />
        </div>
      )}
    </div>
  );
};
