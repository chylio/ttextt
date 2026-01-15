export const TREATMENT_DATA = {
  "口腔顎面外科 (OS)": [
    { id: "os-1", name: "簡單拔牙 (非複雜)", minLevel: "Intern", category: "os" },
    { id: "os-2", name: "簡單阻生齒 (露出2/3)", minLevel: "Intern", category: "os" },
    { id: "os-3", name: "複雜拔牙 (翻瓣)", minLevel: "PGY", category: "os" },
    { id: "os-4", name: "複雜阻生齒 (位於Ramus前)", minLevel: "Fixed R", category: "os" },
    { id: "os-5", name: "植牙評估/手術", minLevel: "VS", category: "os" },
  ],
  "牙髓病科 (Endo)": [
    { id: "endo-1", name: "簡單前牙根管", minLevel: "Intern", category: "endo" },
    { id: "endo-2", name: "大臼齒根管 (初次)", minLevel: "Intern", category: "endo" },
    { id: "endo-3", name: "複雜根管 (鈣化/穿孔)", minLevel: "Fixed R", category: "endo" },
    { id: "endo-4", name: "顯微鏡治療", minLevel: "VS", category: "endo" },
    { id: "endo-5", name: "根尖手術", minLevel: "VS", category: "endo" },
  ],
  "贋復補綴科 (Pros)": [
    { id: "pros-1", name: "簡單單冠/3單位牙橋", minLevel: "Intern", category: "pros" },
    { id: "pros-2", name: "活動假牙 RPD/CD", minLevel: "PGY", category: "pros" },
    { id: "pros-3", name: "植牙贗復", minLevel: "Fixed R", category: "pros" },
    { id: "pros-4", name: "全口重建", minLevel: "VS", category: "pros" },
  ],
  "家庭牙醫/一般 (General)": [
    { id: "gen-1", name: "溝隙封填/洗牙", minLevel: "Intern", category: "general" },
    { id: "gen-2", name: "簡單齲齒填補 (Class I, III)", minLevel: "PGY", category: "general" },
    { id: "gen-3", name: "複雜齲齒填補 (Class II, IV)", minLevel: "Fixed R", category: "general" },
  ],
};
