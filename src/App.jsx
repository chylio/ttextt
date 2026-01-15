import React, { useMemo, useState } from "react";
import {
  BrainCircuit,
  ArrowRight,
  Calendar,
  BarChart3,
  TrendingUp,
  UserCheck,
  Activity,
} from "lucide-react";

import { TREATMENT_DATA } from "./data/treatmentData";
import { INITIAL_DOCTORS } from "./data/initialDoctors";

import TreatmentItem from "./components/TreatmentItem";
import BookingResult from "./components/BookingResult";

import { calculateBestDoctor } from "./logic/matching";
import { todayISO, addDaysISO, calcIntervalDays } from "./utils/date";
import { buildClinicStats, buildDoctorRangeStats } from "./utils/stats";

export default function App() {
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [doctors, setDoctors] = useState(INITIAL_DOCTORS);
  const [bookedDoctor, setBookedDoctor] = useState(null);
  const [isMatching, setIsMatching] = useState(false);

  const [dateRange, setDateRange] = useState({
    start: todayISO(),
    end: addDaysISO(30),
  });

  const intervalDays = useMemo(
    () => calcIntervalDays(dateRange.start, dateRange.end),
    [dateRange]
  );

  const clinicStats = useMemo(
    () => buildClinicStats(intervalDays),
    [intervalDays]
  );

  const doctorRangeStats = useMemo(
    () => buildDoctorRangeStats(doctors, intervalDays),
    [doctors, intervalDays]
  );

  const handleToggle = (item) => {
    setSelectedTreatments((prev) =>
      prev.find((t) => t.id === item.id)
        ? prev.filter((t) => t.id !== item.id)
        : [...prev, item]
    );
  };

  const handleMatch = () => {
    if (selectedTreatments.length === 0) return;
    setIsMatching(true);

    setTimeout(() => {
      const result = calculateBestDoctor(selectedTreatments, doctors);

      if (result && result !== "NONE") {
        setDoctors((prev) =>
          prev.map((d) =>
            d.id === result.id ? { ...d, dailyCount: d.dailyCount + 1 } : d
          )
        );
      }

      setBookedDoctor(result);
      setIsMatching(false);
    }, 1200);
  };

  const handleReset = () => {
    setBookedDoctor(null);
    setSelectedTreatments([]);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 gap-8">
          <div className="flex items-center gap-6">
            <div className="bg-blue-600 p-5 rounded-[2.5rem] text-white shadow-2xl">
              <BrainCircuit size={48} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                AI 智慧診間配對系統
              </h1>
              <p className="text-slate-400 text-sm font-black uppercase tracking-widest mt-1">
                7 Doctors · Smart Clinical Allocation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-3xl border border-slate-100 shadow-inner w-full md:w-auto">
            <div className="px-6 text-center">
              <label className="block text-xs font-black text-slate-400 uppercase mb-1 tracking-widest">
                統計日期範圍
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                  className="bg-transparent border-none p-0 focus:ring-0 text-lg font-bold text-slate-700"
                />
                <ArrowRight size={20} className="text-slate-300" />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
                  className="bg-transparent border-none p-0 focus:ring-0 text-lg font-bold text-slate-700"
                />
              </div>
            </div>
          </div>
        </div>

        {!bookedDoctor ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in duration-700">
            {/* 左側：處置選擇 */}
            <div className="lg:col-span-7 bg-white p-12 rounded-[4rem] shadow-xl border border-white relative overflow-hidden">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-2 h-10 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  第一步：選擇預約處置項目
                </h2>
              </div>

              <div className="space-y-16">
                {Object.entries(TREATMENT_DATA).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-sm font-black text-slate-300 uppercase tracking-[0.4em] mb-6 flex items-center gap-4">
                      {category} <div className="flex-1 h-[1.5px] bg-slate-50"></div>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {items.map((item) => (
                        <TreatmentItem
                          key={item.id}
                          item={item}
                          isSelected={!!selectedTreatments.find((t) => t.id === item.id)}
                          onToggle={handleToggle}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleMatch}
                disabled={selectedTreatments.length === 0 || isMatching}
                className="w-full mt-16 bg-slate-900 hover:bg-blue-600 disabled:bg-slate-200 text-white font-black py-8 rounded-[2.5rem] shadow-2xl transition-all flex items-center justify-center gap-6 text-3xl active:scale-95"
              >
                {isMatching ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent" />
                ) : (
                  <>
                    <BrainCircuit size={40} /> AI 智慧媒合 · 立即掛號
                  </>
                )}
              </button>
            </div>

            {/* 右側資訊欄 */}
            <div className="lg:col-span-5 space-y-10">
              {/* 今日門診預約人數 */}
              <div className="bg-white p-10 rounded-[3.5rem] border border-blue-50 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <Activity size={28} className="text-orange-500" />
                    今日門診預約人數
                  </h2>
                  <div className="bg-orange-50 text-orange-600 px-4 py-1 rounded-full text-xs font-black uppercase">
                    今日限額 5 位
                  </div>
                </div>

                <div className="space-y-6">
                  {doctors.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm ${
                            doc.dailyCount >= 5
                              ? "bg-red-50 text-red-500"
                              : "bg-white text-slate-700"
                          }`}
                        >
                          {doc.name[0]}
                        </div>
                        <div>
                          <p className="text-lg font-black text-slate-900">{doc.name} 醫師</p>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                            {doc.dept}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-baseline gap-1 justify-end">
                          <span
                            className={`text-2xl font-black ${
                              doc.dailyCount >= 5 ? "text-red-500" : "text-slate-900"
                            }`}
                          >
                            {doc.dailyCount}
                          </span>
                          <span className="text-xs font-bold text-slate-300">/ 5</span>
                        </div>
                        <div className="w-20 h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
                          <div
                            className={`h-full transition-all duration-1000 ${
                              doc.dailyCount >= 5 ? "bg-red-500" : "bg-orange-500"
                            }`}
                            style={{ width: `${(doc.dailyCount / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 醫師區間績效統計 */}
              <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <UserCheck size={28} className="text-blue-500" />
                    醫師區間績效統計
                  </h2>
                  <div className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                    {intervalDays} 天統計
                  </div>
                </div>

                <div className="space-y-8 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {doctors.map((doc) => {
                    const personalStats = doctorRangeStats.find((s) => s.id === doc.id);
                    return (
                      <div
                        key={doc.id}
                        className="p-6 bg-slate-50/50 rounded-[2.5rem] border border-slate-100"
                      >
                        <div className="flex justify-between items-center mb-5">
                          <div className="flex items-center gap-3">
                            <div className="text-base font-black text-slate-800">{doc.name}</div>
                            <span className="text-[10px] bg-white border px-2 py-0.5 rounded text-slate-400 uppercase">
                              {doc.level}
                            </span>
                          </div>
                          <div className="text-xl font-black text-blue-600">
                            {personalStats?.total} <span className="text-[10px] text-slate-300 ml-1">人次</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                          {Object.entries(personalStats?.cases || {}).map(([key, value]) => (
                            <div key={key} className="space-y-1">
                              <div className="flex justify-between text-[9px] font-black uppercase text-slate-400">
                                <span>{key}</span>
                                <span>{value}</span>
                              </div>
                              <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${
                                    key === "os"
                                      ? "bg-blue-400"
                                      : key === "endo"
                                      ? "bg-green-400"
                                      : key === "pros"
                                      ? "bg-purple-400"
                                      : "bg-amber-400"
                                  }`}
                                  style={{ width: `${(value / (personalStats?.total || 1)) * 100}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 全院統計 */}
              <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <BarChart3 size={100} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp size={24} className="text-blue-400" />
                    <h2 className="text-xl font-black tracking-widest uppercase">全院區間摘要</h2>
                  </div>
                  <div className="text-5xl font-black text-white tracking-tighter mb-8">
                    {clinicStats.total} <span className="text-lg font-bold text-blue-400 ml-1">人次累計</span>
                  </div>
                  <div className="grid grid-cols-2 gap-6 text-xs font-black uppercase tracking-widest text-slate-400">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> OS: {clinicStats.os}</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Endo: {clinicStats.endo}</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Pros: {clinicStats.pros}</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Gen: {clinicStats.gen}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <BookingResult doctor={bookedDoctor} dateRange={dateRange} onReset={handleReset} />
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .animate-in { animation: fadeIn 0.6s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
