import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function TreatmentItem({ item, isSelected, onToggle }) {
  return (
    <button
      onClick={() => onToggle(item)}
      className={`flex flex-col p-6 rounded-2xl border-2 transition-all text-left relative overflow-hidden group ${
        isSelected
          ? "border-blue-500 bg-blue-50/50 shadow-lg scale-[1.02]"
          : "border-slate-100 bg-white hover:border-blue-200"
      }`}
    >
      <span className="font-bold text-xl mb-2 group-hover:text-blue-600 transition-colors">
        {item.name}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-black text-slate-400 uppercase tracking-tighter bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
          門檻: {item.minLevel}
        </span>
      </div>
      {isSelected && (
        <CheckCircle2 size={24} className="absolute top-5 right-5 text-blue-500 animate-in zoom-in" />
      )}
    </button>
  );
}
