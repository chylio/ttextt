import React from "react";
import { AlertCircle, Calendar, CheckCircle2, Clock, Printer, RotateCcw, Sparkles } from "lucide-react";

export default function BookingResult({ doctor, dateRange, onReset }) {
  if (doctor === "NONE") {
    return (
      <div className="text-center p-16 bg-white rounded-[4rem] border border-slate-200 shadow-2xl max-w-2xl mx-auto">
        <AlertCircle size={80} className="mx-auto text-amber-500 mb-8" />
        <h2 className="text-4xl font-black mb-4">無法配對合適醫師</h2>
        <p className="text-xl text-slate-500 mb-10">目前符合職等要求的醫師皆已約診額滿，請調整日期或項目。</p>
        <button
          onClick={onReset}
          className="px-12 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all text-xl"
        >
          返回修改內容
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-white animate-in slide-in-from-bottom-12 duration-700">
      <div className="bg-blue-600 p-14 text-white text-center relative">
        <div className="relative z-10">
          <CheckCircle2 size={64} className="mx-auto mb-4" />
          <h2 className="text-4xl font-black mb-2 tracking-tight">預約掛號成功！</h2>
          <p className="opacity-80 font-bold text-sm uppercase tracking-[0.2em]">Appointment Confirmed by AI Engine</p>
        </div>
      </div>

      <div className="p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-8">
          <div className="text-center space-y-6">
            <div className="w-40 h-40 bg-gradient-to-br from-slate-50 to-blue-50 rounded-[3.5rem] flex items-center justify-center text-7xl font-black text-blue-600 mx-auto border-8 border-white shadow-2xl">
              {doctor.name[0]}
            </div>
            <div>
              <h3 className="text-4xl font-black text-slate-900">
                {doctor.name} <span className="text-2xl font-bold text-slate-400">醫師</span>
              </h3>
              <div className="flex justify-center gap-3 mt-4">
                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-md shadow-blue-100">
                  {doctor.level}
                </span>
                <span className="bg-slate-100 text-slate-500 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest">
                  {doctor.dept}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex items-center gap-6">
              <Clock className="text-blue-500" size={32} />
              <div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">今日報到序號</div>
                <div className="text-4xl font-black text-slate-900 tracking-tighter">第 {doctor.dailyCount} 號</div>
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex items-center gap-6">
              <Calendar className="text-indigo-500" size={32} />
              <div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">預約區間</div>
                <div className="text-base font-black text-slate-700 leading-snug">
                  {dateRange.start} <br />至 {dateRange.end}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8 bg-blue-50/50 p-10 rounded-[3.5rem] border border-blue-100 shadow-inner">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg">
              <Sparkles size={24} />
            </div>
            <h4 className="text-2xl font-black text-blue-900 tracking-tight">AI 媒合決策解析</h4>
          </div>
          <div className="space-y-6">
            {doctor.aiReasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-start gap-4 animate-in slide-in-from-left duration-500"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-2.5 shrink-0 shadow-sm shadow-blue-200"></div>
                <p className="text-lg font-bold text-blue-800 leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-12 pt-0 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => window.print()}
          className="flex-1 bg-white border-2 border-slate-200 text-slate-500 font-black py-5 rounded-3xl hover:bg-slate-50 transition-all text-lg flex items-center justify-center gap-3"
        >
          <Printer size={24} /> 列印預約憑證
        </button>
        <button
          onClick={onReset}
          className="flex-[2] bg-slate-900 text-white font-black py-5 rounded-3xl shadow-2xl transition-all active:scale-95 text-lg flex items-center justify-center gap-3"
        >
          <RotateCcw size={24} /> 完成並返回首頁
        </button>
      </div>
    </div>
  );
}
