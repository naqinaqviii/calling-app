const { useState } = React;

const injectStyles = () => {
  if (document.getElementById("admin-styles")) return;
  const s = document.createElement("style");
  s.id = "admin-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:        #f0f2f5;
      --bg2:       #ffffff;
      --sidebar:   #1c2333;
      --sidebar2:  #232c42;
      --surface:   #ffffff;
      --surface2:  #f8f9fb;
      --surface3:  #eef0f5;
      --border:    #e2e6ef;
      --border2:   #cdd2e0;
      --accent:    #2563eb;
      --accent-lt: #eff4ff;
      --accent-dk: #1d4ed8;
      --text:      #111827;
      --text2:     #4b5675;
      --muted:     #9ca3c0;
      --positive:  #059669;
      --pos-lt:    #ecfdf5;
      --negative:  #dc2626;
      --neg-lt:    #fef2f2;
      --neutral:   #b45309;
      --neu-lt:    #fffbeb;
      --mixed:     #7c3aed;
      --mix-lt:    #f5f3ff;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04);
      --shadow:    0 4px 12px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04);
      --shadow-lg: 0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06);
      --radius:    10px;
      --font:      'DM Sans', sans-serif;
      --mono:      'DM Mono', monospace;
    }

    body { font-family: var(--font); background: var(--bg); color: var(--text); height: 100vh; overflow: hidden; -webkit-font-smoothing: antialiased; }
    .shell { display: flex; height: 100vh; overflow: hidden; }

    /* ── Sidebar ── */
    .adm-sidebar {
      width: 224px; flex-shrink: 0;
      background: var(--sidebar);
      display: flex; flex-direction: column;
    }
    .adm-logo {
      padding: 20px 18px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .logo-mark { display: flex; align-items: center; gap: 10px; }
    .logo-icon {
      width: 34px; height: 34px; border-radius: 8px;
      background: var(--accent); display: flex; align-items: center; justify-content: center;
      font-size: 16px; font-weight: 800; color: white;
      box-shadow: 0 2px 8px rgba(37,99,235,0.4);
    }
    .logo-name { font-size: 15px; font-weight: 700; color: #f1f5f9; letter-spacing: -0.2px; }
    .logo-sub  { font-size: 10px; color: rgba(255,255,255,0.35); font-family: var(--mono); margin-top: 1px; letter-spacing: 0.5px; }
    .admin-badge {
      display: inline-flex; align-items: center; gap: 5px;
      margin-top: 10px; padding: 3px 9px; border-radius: 20px;
      background: rgba(37,99,235,0.2); border: 1px solid rgba(37,99,235,0.3);
      font-size: 10px; font-weight: 600; color: #93b4fd; font-family: var(--mono);
    }
    .admin-badge::before { content:''; width:5px; height:5px; border-radius:50%; background:#34d399; flex-shrink:0; }

    .adm-nav { flex: 1; padding: 10px 8px; display: flex; flex-direction: column; gap: 1px; overflow-y: auto; }
    .nav-grp-label {
      padding: 10px 10px 4px; font-size: 10px; font-weight: 600;
      color: rgba(255,255,255,0.25); letter-spacing: 1px; text-transform: uppercase; font-family: var(--mono); margin-top: 4px;
    }
    .nav-item {
      display: flex; align-items: center; gap: 9px;
      padding: 8px 10px; border-radius: 7px;
      cursor: pointer; border: none; background: transparent;
      color: rgba(255,255,255,0.5); font-family: var(--font); font-size: 13.5px; font-weight: 500;
      transition: all 0.13s; text-align: left; width: 100%;
    }
    .nav-item:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.85); }
    .nav-item.active { background: rgba(37,99,235,0.22); color: #bfcffd; font-weight: 600; }
    .nav-icon { font-size: 15px; width: 18px; text-align: center; flex-shrink: 0; }
    .nav-badge-pill {
      margin-left: auto; font-size: 10px; font-weight: 700;
      background: #dc2626; color: white;
      min-width: 17px; height: 17px; border-radius: 9px; padding: 0 4px;
      display: flex; align-items: center; justify-content: center;
    }
    .adm-user {
      padding: 12px 14px; border-top: 1px solid rgba(255,255,255,0.06);
      display: flex; align-items: center; gap: 9px;
    }
    .adm-ava {
      width: 30px; height: 30px; border-radius: 50%;
      background: var(--accent); display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; color: white; flex-shrink: 0;
    }
    .adm-uname { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.8); }
    .adm-urole { font-size: 10.5px; color: rgba(255,255,255,0.3); font-family: var(--mono); }

    /* ── Main ── */
    .adm-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .adm-topbar {
      height: 54px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 22px; background: var(--bg2); border-bottom: 1px solid var(--border);
    }
    .page-title { font-size: 16px; font-weight: 700; color: var(--text); letter-spacing: -0.3px; }
    .page-title span { color: var(--accent); }
    .topbar-right { display: flex; align-items: center; gap: 7px; }

    .btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 13px; border-radius: 7px;
      font-family: var(--font); font-size: 13px; font-weight: 600;
      cursor: pointer; border: 1px solid var(--border); background: var(--bg2);
      color: var(--text2); transition: all 0.13s;
    }
    .btn:hover { background: var(--surface3); color: var(--text); border-color: var(--border2); }
    .btn-primary { background: var(--accent); color: white; border-color: transparent; box-shadow: 0 1px 5px rgba(37,99,235,0.25); }
    .btn-primary:hover { background: var(--accent-dk); box-shadow: 0 3px 10px rgba(37,99,235,0.3); }

    .adm-content { flex: 1; overflow-y: auto; padding: 20px 22px; }
    .adm-content::-webkit-scrollbar { width: 5px; }
    .adm-content::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }

    /* KPIs */
    .kpi-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 20px; }
    .kpi-card {
      background: var(--bg2); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 16px 18px;
      box-shadow: var(--shadow-sm); transition: box-shadow 0.18s, transform 0.18s;
    }
    .kpi-card:hover { box-shadow: var(--shadow); transform: translateY(-1px); }
    .kpi-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
    .kpi-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
    .kpi-trend { font-size: 11px; font-weight: 700; font-family: var(--mono); padding: 2px 7px; border-radius: 20px; }
    .kpi-trend.up   { background: var(--pos-lt); color: var(--positive); }
    .kpi-trend.down { background: var(--neg-lt); color: var(--negative); }
    .kpi-value { font-size: 24px; font-weight: 800; letter-spacing: -0.8px; color: var(--text); }
    .kpi-label { font-size: 12px; color: var(--muted); margin-top: 3px; font-weight: 500; }

    /* Section header */
    .sec-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; margin-top: 4px; }
    .sec-title { font-size: 13.5px; font-weight: 700; color: var(--text); }
    .sec-sub   { font-size: 12px; color: var(--muted); font-weight: 400; margin-left: 5px; }

    /* Charts */
    .charts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
    .chart-card {
      background: var(--bg2); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 16px 18px; box-shadow: var(--shadow-sm);
    }
    .chart-title { font-size: 12.5px; font-weight: 700; color: var(--text2); margin-bottom: 14px; }
    .donut-wrap { position: relative; width: 106px; height: 106px; margin: 0 auto 12px; }
    .donut-svg { transform: rotate(-90deg); }
    .donut-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .donut-pct { font-size: 19px; font-weight: 800; color: var(--text); }
    .donut-lbl { font-size: 10px; color: var(--muted); font-weight: 500; }
    .legend { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
    .legend-item { display: flex; align-items: center; gap: 5px; font-size: 11.5px; color: var(--text2); font-weight: 500; }
    .legend-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

    .bar-chart { display: flex; flex-direction: column; gap: 8px; }
    .bar-row { display: flex; align-items: center; gap: 9px; }
    .bar-day { width: 26px; font-size: 11px; color: var(--muted); font-family: var(--mono); text-align: right; flex-shrink: 0; }
    .bar-track { flex: 1; height: 19px; background: var(--surface3); border-radius: 5px; overflow: hidden; }
    .bar-fill { height: 100%; border-radius: 5px; display: flex; align-items: center; padding-left: 8px; transition: width 0.7s; }
    .bar-val  { font-size: 11px; font-weight: 700; color: white; font-family: var(--mono); }

    /* Filters */
    .filter-row { display: flex; gap: 6px; margin-bottom: 12px; flex-wrap: wrap; align-items: center; }
    .filter-chip {
      padding: 5px 12px; border-radius: 20px;
      background: var(--bg2); border: 1px solid var(--border);
      color: var(--text2); font-size: 12px; font-weight: 600;
      cursor: pointer; transition: all 0.12s; font-family: var(--font);
    }
    .filter-chip:hover { border-color: var(--accent); color: var(--accent); }
    .filter-chip.active { background: var(--accent-lt); border-color: var(--accent); color: var(--accent); }
    .search-wrap {
      margin-left: auto; display: flex; align-items: center; gap: 6px;
      background: var(--bg2); border: 1px solid var(--border); border-radius: 7px; padding: 6px 11px;
    }
    .search-wrap:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,0.08); }
    .search-inp { background: transparent; border: none; outline: none; color: var(--text); font-family: var(--font); font-size: 13px; width: 180px; }
    .search-inp::placeholder { color: var(--muted); }

    /* Table */
    .table-wrap { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow-sm); margin-bottom: 18px; }
    table { width: 100%; border-collapse: collapse; }
    thead th {
      text-align: left; padding: 9px 15px;
      font-size: 10.5px; font-weight: 700; color: var(--muted);
      letter-spacing: 0.7px; text-transform: uppercase;
      background: var(--surface2); border-bottom: 1px solid var(--border); font-family: var(--mono);
    }
    tbody td { padding: 11px 15px; border-bottom: 1px solid var(--border); vertical-align: middle; }
    tbody tr:last-child td { border-bottom: none; }
    tbody tr { cursor: pointer; transition: background 0.11s; }
    tbody tr:hover { background: #f6f8fd; }
    tbody tr.selected { background: var(--accent-lt); }

    .ct-title { font-size: 13px; font-weight: 600; color: var(--text); }
    .ct-sub   { font-size: 11px; color: var(--muted); margin-top: 1px; font-family: var(--mono); }
    .ct-dur   { font-family: var(--mono); font-size: 13px; font-weight: 500; color: var(--text2); }
    .ct-date  { font-size: 11.5px; color: var(--text2); font-family: var(--mono); }

    .p-chips { display: flex; }
    .p-chip { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; color: white; border: 2px solid white; margin-left: -5px; }
    .p-chip:first-child { margin-left: 0; }
    .p-more { font-size: 11px; color: var(--muted); margin-left: 5px; align-self: center; }

    /* Sentiment pill */
    .sent-pill { display: inline-flex; align-items: center; gap: 4px; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 700; font-family: var(--mono); }
    .sent-pill.positive { background: var(--pos-lt); color: var(--positive); }
    .sent-pill.negative { background: var(--neg-lt); color: var(--negative); }
    .sent-pill.neutral  { background: var(--neu-lt); color: var(--neutral); }
    .sent-pill.mixed    { background: var(--mix-lt); color: var(--mixed); }
    .sent-pill.analyzing { background: var(--accent-lt); color: var(--accent); animation: plsAnim 1.4s infinite; }
    @keyframes plsAnim { 0%,100%{opacity:1} 50%{opacity:0.5} }

    .score-row { display: flex; align-items: center; gap: 8px; }
    .score-track { width: 68px; height: 5px; border-radius: 3px; background: var(--surface3); overflow: hidden; }
    .score-fill  { height: 100%; border-radius: 3px; transition: width 0.6s; }
    .score-pct   { font-size: 11px; font-family: var(--mono); color: var(--muted); font-weight: 500; }

    .act-btns { display: flex; gap: 5px; }
    .act-btn {
      padding: 4px 10px; border-radius: 6px;
      background: var(--surface2); border: 1px solid var(--border);
      color: var(--text2); font-size: 11px; font-weight: 600;
      cursor: pointer; font-family: var(--font); transition: all 0.12s;
    }
    .act-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-lt); }

    /* Alerts */
    .alerts-list { display: flex; flex-direction: column; gap: 9px; }
    .alert-card {
      display: flex; align-items: flex-start; gap: 12px;
      background: var(--bg2); border: 1px solid var(--border); border-left: 3px solid;
      border-radius: var(--radius); padding: 13px 15px;
      box-shadow: var(--shadow-sm); cursor: pointer; transition: box-shadow 0.14s, transform 0.14s;
    }
    .alert-card:hover { box-shadow: var(--shadow); transform: translateX(2px); }
    .alert-card.high   { border-left-color: var(--negative); }
    .alert-card.medium { border-left-color: var(--neutral); }
    .alert-card.low    { border-left-color: var(--positive); }
    .alert-icon  { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
    .alert-title { font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 3px; }
    .alert-desc  { font-size: 12.5px; color: var(--text2); line-height: 1.55; }
    .alert-meta  { font-size: 11px; color: var(--muted); font-family: var(--mono); margin-top: 5px; }
    .alert-sev { margin-left: auto; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; font-family: var(--mono); flex-shrink: 0; align-self: flex-start; }
    .alert-sev.high   { background: var(--neg-lt); color: var(--negative); }
    .alert-sev.medium { background: var(--neu-lt); color: var(--neutral); }
    .alert-sev.low    { background: var(--pos-lt); color: var(--positive); }

    /* Drawer */
    .drawer-overlay {
      position: fixed; inset: 0; z-index: 200;
      background: rgba(17,24,39,0.3); backdrop-filter: blur(3px);
      display: flex; justify-content: flex-end; animation: fadeOv 0.2s ease;
    }
    @keyframes fadeOv { from{opacity:0} to{opacity:1} }
    .drawer {
      width: 520px; height: 100vh; background: var(--bg2);
      border-left: 1px solid var(--border); display: flex; flex-direction: column; overflow: hidden;
      box-shadow: var(--shadow-lg); animation: slideD 0.26s cubic-bezier(.22,1,.36,1);
    }
    @keyframes slideD { from{transform:translateX(28px);opacity:0} to{transform:none;opacity:1} }

    .drawer-hdr { padding: 18px 20px 14px; border-bottom: 1px solid var(--border); flex-shrink: 0; background: var(--bg2); }
    .drawer-title-row { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 13px; }
    .drawer-title { font-size: 16px; font-weight: 800; color: var(--text); letter-spacing: -0.3px; }
    .drawer-meta  { font-size: 11.5px; color: var(--muted); font-family: var(--mono); margin-top: 2px; }
    .close-btn { width: 28px; height: 28px; border-radius: 6px; background: var(--surface3); border: 1px solid var(--border); color: var(--muted); cursor: pointer; font-size: 13px; display: flex; align-items: center; justify-content: center; transition: all 0.12s; }
    .close-btn:hover { background: var(--border2); color: var(--text); }

    .drawer-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 9px; }
    .dstat { background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: 9px 11px; text-align: center; }
    .dstat-val { font-size: 17px; font-weight: 800; color: var(--text); }
    .dstat-lbl { font-size: 9.5px; color: var(--muted); margin-top: 2px; font-family: var(--mono); text-transform: uppercase; font-weight: 600; }

    .drawer-tabs { display: flex; border-bottom: 1px solid var(--border); flex-shrink: 0; }
    .dtab { flex: 1; padding: 10px 8px; background: transparent; border: none; border-bottom: 2px solid transparent; color: var(--muted); font-family: var(--font); font-size: 12.5px; font-weight: 600; cursor: pointer; transition: all 0.13s; }
    .dtab:hover { color: var(--text2); }
    .dtab.active { color: var(--accent); border-bottom-color: var(--accent); }

    .drawer-body { flex: 1; overflow-y: auto; padding: 16px 18px; background: var(--surface2); }
    .drawer-body::-webkit-scrollbar { width: 4px; }
    .drawer-body::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

    .ai-summary { background: var(--accent-lt); border: 1px solid rgba(37,99,235,0.18); border-radius: 9px; padding: 13px 15px; margin-bottom: 12px; }
    .ai-label { font-size: 10px; font-weight: 700; font-family: var(--mono); color: var(--accent); letter-spacing: 0.7px; text-transform: uppercase; margin-bottom: 6px; }
    .ai-text  { font-size: 13px; line-height: 1.7; color: var(--text2); }

    .sent-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 9px; padding: 14px; margin-bottom: 11px; }
    .sent-card-title { font-size: 10.5px; font-weight: 700; color: var(--muted); margin-bottom: 11px; text-transform: uppercase; letter-spacing: 0.6px; font-family: var(--mono); }
    .overall-row { display: flex; align-items: center; gap: 11px; margin-bottom: 13px; }
    .os-emoji { font-size: 28px; }
    .os-label { font-size: 15px; font-weight: 800; }
    .os-score { font-size: 11px; color: var(--muted); font-family: var(--mono); margin-top: 1px; }
    .sent-bars { display: flex; flex-direction: column; gap: 8px; }
    .sbar-row   { display: flex; align-items: center; gap: 9px; }
    .sbar-lbl   { width: 62px; font-size: 12px; color: var(--text2); font-weight: 600; flex-shrink: 0; }
    .sbar-track { flex: 1; height: 6px; border-radius: 3px; background: var(--surface3); overflow: hidden; }
    .sbar-fill  { height: 100%; border-radius: 3px; transition: width 0.8s cubic-bezier(.4,0,.2,1); }
    .sbar-pct   { width: 30px; font-size: 11px; font-family: var(--mono); color: var(--muted); text-align: right; flex-shrink: 0; font-weight: 600; }

    .timeline-wrap { background: var(--bg2); border: 1px solid var(--border); border-radius: 9px; padding: 13px 14px; margin-bottom: 11px; }
    .timeline-label { font-size: 10.5px; font-weight: 700; color: var(--muted); font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 9px; }
    .tl-bars { display: flex; gap: 3px; align-items: flex-end; height: 48px; }
    .tl-bar  { flex: 1; border-radius: 3px 3px 0 0; min-height: 4px; cursor: pointer; transition: opacity 0.15s; }
    .tl-bar:hover { opacity: 0.75; }

    .spkr-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 11px; }
    .spkr-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 9px; padding: 12px 13px; }
    .spkr-top  { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
    .spkr-ava  { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; flex-shrink: 0; }
    .spkr-name { font-size: 13px; font-weight: 700; color: var(--text); }
    .spkr-role { font-size: 11px; color: var(--muted); }

    .trans-view { display: flex; flex-direction: column; gap: 8px; }
    .tv-entry { background: var(--bg2); border: 1px solid var(--border); border-radius: 9px; padding: 10px 12px; border-left: 3px solid var(--border2); }
    .tv-entry.positive { border-left-color: var(--positive); }
    .tv-entry.negative { border-left-color: var(--negative); }
    .tv-entry.neutral  { border-left-color: var(--neutral); }
    .tv-hdr  { display: flex; align-items: center; gap: 7px; margin-bottom: 4px; }
    .tv-spkr { font-size: 11.5px; font-weight: 700; color: var(--text2); font-family: var(--mono); }
    .tv-time { font-size: 10px; color: var(--muted); font-family: var(--mono); margin-left: auto; }
    .tv-text { font-size: 13px; line-height: 1.6; color: var(--text); }
    .tv-sent { font-size: 10px; font-family: var(--mono); margin-top: 3px; font-weight: 700; }

    .moment-list { display: flex; flex-direction: column; gap: 8px; }
    .moment-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 9px; padding: 11px 13px; border-left: 3px solid var(--border2); }
    .moment-card.positive { border-left-color: var(--positive); background: #fbfffc; }
    .moment-card.negative { border-left-color: var(--negative); background: #fffbfb; }
    .moment-card.neutral  { border-left-color: var(--neutral);  background: #fffef8; }
    .moment-top  { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; }
    .moment-spkr { font-size: 11px; font-weight: 700; font-family: var(--mono); color: var(--text2); }
    .moment-time { font-size: 10px; color: var(--muted); font-family: var(--mono); margin-left: auto; }
    .moment-txt  { font-size: 13px; line-height: 1.55; color: var(--text); font-style: italic; }
    .moment-tag  { font-size: 10px; font-weight: 700; font-family: var(--mono); margin-top: 5px; }

    .ai-empty { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 44px 20px; text-align: center; }
    .ai-spinner { width: 38px; height: 38px; border-radius: 50%; border: 3px solid var(--surface3); border-top-color: var(--accent); animation: spin 0.85s linear infinite; }
    @keyframes spin { to{transform:rotate(360deg)} }
    .ai-empty-text { font-size: 14px; color: var(--text2); font-weight: 600; }
    .ai-empty-sub  { font-size: 12px; color: var(--muted); }

    .toast-stack { position: fixed; bottom: 18px; right: 18px; z-index: 999; display: flex; flex-direction: column; gap: 6px; }
    .toast-item {
      background: var(--sidebar); color: rgba(255,255,255,0.88);
      border-radius: 8px; padding: 9px 15px; font-size: 13px; font-weight: 500;
      box-shadow: var(--shadow-lg); animation: toastIn 0.22s ease; max-width: 300px;
    }
    @keyframes toastIn { from{opacity:0;transform:translateY(7px)} to{opacity:1;transform:none} }
  `;
  document.head.appendChild(s);
};
injectStyles();

const CALL_HISTORY = [
  {
    id: "c1", title: "Daily Standup", channel: "Engineering", date: "2026-02-23", time: "10:00 AM", duration: "28:14",
    participants: [{ n: "Zara Khan", a: "ZK", c: "#2563eb" }, { n: "Ali Raza", a: "AR", c: "#dc2626" }, { n: "Sara Ahmed", a: "SA", c: "#059669" }, { n: "Hamza Sheikh", a: "HS", c: "#b45309" }],
    sentiment: "positive", score: 0.82, pos: 72, neg: 8, neu: 20, analyzed: true,
    transcript: [
      { id: 1, speaker: "Zara Khan", text: "Salam! Aaj ka standup shuru karte hain. Koi blocker hai?", time: "10:00", sentiment: "positive", s: 0.9 },
      { id: 2, speaker: "Ali Raza", text: "Mera kaam smooth chal raha hai. Sprint board updated.", time: "10:02", sentiment: "positive", s: 0.78 },
      { id: 3, speaker: "Sara Ahmed", text: "API mein kuch chhote issues hain lekin handle ho rahe hain.", time: "10:04", sentiment: "neutral", s: 0.5 },
      { id: 4, speaker: "Hamza Sheikh", text: "Deployment mein delay ho sakta hai — server issue hai.", time: "10:06", sentiment: "negative", s: 0.35 },
      { id: 5, speaker: "Zara Khan", text: "Theek hai, Hamza DevOps se baat karo. Baaki sab acha!", time: "10:09", sentiment: "positive", s: 0.85 },
    ],
    aiSummary: "Meeting productive rahi with good team morale. Ek deployment delay issue identify kiya gaya jo DevOps team ke saath resolve hoga. Har participant ne clear updates diye.",
    keyMoments: [
      { speaker: "Hamza Sheikh", text: "Deployment mein delay ho sakta hai — server issue hai.", time: "10:06", type: "negative" },
      { speaker: "Zara Khan", text: "Theek hai, Hamza DevOps se baat karo. Baaki sab acha!", time: "10:09", type: "positive" },
    ],
    speakerSentiments: [
      { name: "Zara Khan", avatar: "ZK", color: "#2563eb", sentiment: "positive", score: 0.87, chars: 89 },
      { name: "Ali Raza", avatar: "AR", color: "#dc2626", sentiment: "positive", score: 0.76, chars: 62 },
      { name: "Sara Ahmed", avatar: "SA", color: "#059669", sentiment: "neutral", score: 0.55, chars: 71 },
      { name: "Hamza Sheikh", avatar: "HS", color: "#b45309", sentiment: "negative", score: 0.38, chars: 54 },
    ],
    timeline: [0.8, 0.7, 0.85, 0.6, 0.5, 0.4, 0.35, 0.45, 0.7, 0.82, 0.88, 0.75],
  }
];

const ALERTS = [
  { id: 1, title: "High Negative Sentiment — Client Call", desc: "Client Feedback Call (Feb 20) mein 55% negative sentiment detect hua. Client churn risk possible.", meta: "Feb 20, 2026 · Ahmed Corp", sev: "high", icon: "⚠️" },
  { id: 2, title: "Design Team Morale Decline", desc: "Design team ki last 3 meetings mein avg sentiment 0.45 raha — team baseline se kaafi neeche.", meta: "Feb 18–22, 2026 · Design Channel", sev: "medium", icon: "📉" }
];

const WEEKLY = [{ day: "Mon", calls: 8, pos: 6 }, { day: "Tue", calls: 12, pos: 9 }, { day: "Wed", calls: 6, pos: 4 }, { day: "Thu", calls: 14, pos: 10 }, { day: "Fri", calls: 9, pos: 7 }];

const SENT_MAP = {
  positive: { label: "Positive", emoji: "😊" }, negative: { label: "Negative", emoji: "😟" },
  neutral: { label: "Neutral", emoji: "😐" }, mixed: { label: "Mixed", emoji: "🤔" }, analyzing: { label: "Analyzing…", emoji: "⏳" },
};

function SentPill({ type }) {
  const s = SENT_MAP[type] || SENT_MAP.neutral;
  return <span className={`sent-pill ${type}`}>{s.emoji} {s.label}</span>;
}
function ScoreBar({ score, color }) {
  const pct = Math.round(score * 100);
  return <div className="score-row"><div className="score-track"><div className="score-fill" style={{ width: `${pct}%`, background: color || "var(--accent)" }} /></div><span className="score-pct">{pct}%</span></div>;
}
function DonutChart({ pos, neg, neu }) {
  const total = pos + neg + neu, r = 42, cx = 53, cy = 53, circ = 2 * Math.PI * r;
  const pL = (pos / total) * circ, nL = (neg / total) * circ;
  return (
    <div className="donut-wrap">
      <svg width="106" height="106" className="donut-svg">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--surface3)" strokeWidth="11" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#059669" strokeWidth="11" strokeDasharray={`${pL} ${circ - pL}`} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#dc2626" strokeWidth="11" strokeDasharray={`${nL} ${circ - nL}`} strokeDashoffset={-pL} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#b45309" strokeWidth="11" strokeDasharray={`${circ - pL - nL} ${pL + nL}`} strokeDashoffset={-(pL + nL)} strokeLinecap="round" />
      </svg>
      <div className="donut-center"><div className="donut-pct">{pos}%</div><div className="donut-lbl">Positive</div></div>
    </div>
  );
}

function AdminPortal() {
  const [page, setPage] = useState("dashboard");
  const [selected, setSelected] = useState(null);
  const [drawerTab, setDrawerTab] = useState("sentiment");
  const [calls, setCalls] = useState(CALL_HISTORY);
  const [sentFilter, setSentFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [toasts, setToasts] = useState([]);
  const [analyzingId, setAnalyzingId] = useState(null);

  const toast = (msg) => { const id = Date.now(); setToasts(p => [...p, { id, msg }]); setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500); };

  const analyze = async (call) => {
    if (call.analyzed) { setSelected(call); setDrawerTab("sentiment"); return; }
    setAnalyzingId(call.id);
    toast(`Analyzing "${call.title}" with Claude…`);
    const txt = call.transcript.map(t => `${t.speaker} [${t.time}]: ${t.text} `).join("\n");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: `Return ONLY valid JSON with: overall(positive / negative / neutral / mixed), score(0 - 1), positivity(int), negativity(int), neutrality(int), summary(2 - 3 sentences), speakerSentiments[{ name, sentiment, score, insight }], keyMoments[{ speaker, text, time, type }].No markdown.`, messages: [{ role: "user", content: `Analyze: \n${txt} ` }] }) });
      const data = await res.json();
      const r = JSON.parse((data.content?.[0]?.text || "{}").replace(/```json | ```/g, "").trim());
      const pC = {}; call.participants.forEach(p => pC[p.n] = p.c);
      const updated = calls.map(c => c.id !== call.id ? c : {
        ...c, sentiment: r.overall, score: r.score, pos: r.positivity, neg: r.negativity, neu: r.neutrality, aiSummary: r.summary, analyzed: true,
        keyMoments: (r.keyMoments || []).slice(0, 3),
        speakerSentiments: (r.speakerSentiments || []).map(s => ({ ...s, avatar: call.participants.find(p => p.n === s.name)?.a || s.name.slice(0, 2).toUpperCase(), color: pC[s.name] || "#2563eb", chars: call.transcript.filter(t => t.speaker === s.name).reduce((a, t) => a + t.text.length, 0) || 50 }))
      });
      setCalls(updated); setSelected(updated.find(c => c.id === call.id)); setDrawerTab("sentiment");
      toast(`✓ Analysis complete for "${call.title}"`);
    } catch (e) { console.error(e); toast("Analysis failed — check API connection"); }
    finally { setAnalyzingId(null); }
  };

  const filtered = calls.filter(c => {
    const fOk = sentFilter === "all" || c.sentiment === sentFilter;
    const sOk = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.participants.some(p => p.n.toLowerCase().includes(search.toLowerCase()));
    return fOk && sOk;
  });

  const avgScore = Math.round((calls.reduce((a, c) => a + (c.score || 0.5), 0) / calls.length) * 100);
  const negCount = calls.filter(c => c.sentiment === "negative").length;
  const totalMin = calls.reduce((a, c) => { const p = c.duration.split(":"); return a + parseInt(p[0]) * 60 + parseInt(p[1]); }, 0);

  const navGroups = [
    { grp: "Overview", items: [{ id: "dashboard", icon: "◧", label: "Dashboard" }, { id: "alerts", icon: "◈", label: "Alerts", badge: 3 }] },
    { grp: "Meetings", items: [{ id: "callhistory", icon: "⊡", label: "Call History" }, { id: "transcripts", icon: "≡", label: "Transcripts" }, { id: "sentiment", icon: "◎", label: "Sentiment" }] },
    { grp: "Admin", items: [{ id: "users", icon: "⊙", label: "Users" }, { id: "settings", icon: "◉", label: "Settings" }] },
  ];

  return (
    <div className="shell">
      <aside className="adm-sidebar">
        <div className="adm-logo">
          <div className="logo-mark">
            <div className="logo-icon">N</div>
            <div><div className="logo-name">NovaTeams</div><div className="logo-sub">Admin Portal</div></div>
          </div>
        </div>
        <nav className="adm-nav">
          {navGroups.map(g => (
            <div key={g.grp}>
              <div className="nav-grp-label">{g.grp}</div>
              {g.items.map(n => (
                <button key={n.id} className={`nav-item ${page === n.id ? "active" : ""}`}
                  onClick={() => setPage(n.id)}>
                  <span className="nav-icon">{n.icon}</span>{n.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <div className="adm-main">
        <div className="adm-topbar">
          <div className="page-title">
            {page === "dashboard" && <><span>Intelligence</span> Dashboard</>}
            {page === "callhistory" && <><span>Call</span> History</>}
            {page === "alerts" && <><span>Smart</span> Alerts</>}
            {page === "sentiment" && <><span>Sentiment</span> Analysis</>}
            {page === "transcripts" && <><span>All</span> Transcripts</>}
          </div>
          <div className="topbar-right">
            <button className="btn" onClick={() => toast("Exporting report…")}>↓ Export</button>
            <button className="btn btn-primary" onClick={() => toast("Data refreshed")}>↺ Refresh</button>
          </div>
        </div>

        <div className="adm-content">

          {/* ── DASHBOARD / SENTIMENT ── */}
          {(page === "dashboard" || page === "sentiment") && (
            <>
              <div className="kpi-grid">
                {[
                  { icon: "📞", bg: "rgba(37,99,235,0.07)", label: "Total Calls", value: calls.length, trend: "+12%", up: true },
                  { icon: "😊", bg: "rgba(5,150,105,0.07)", label: "Avg Sentiment", value: `${avgScore}%`, trend: "+5%", up: true },
                  { icon: "🕐", bg: "rgba(180,83,9,0.07)", label: "Total Duration", value: `${Math.floor(totalMin / 60)}h ${totalMin % 60}m`, trend: "+23%", up: true },
                  { icon: "⚠️", bg: "rgba(220,38,38,0.07)", label: "Negative Calls", value: negCount, trend: "-2", up: false },
                ].map((k, i) => (
                  <div key={i} className="kpi-card">
                    <div className="kpi-hdr"><div className="kpi-icon" style={{ background: k.bg }}>{k.icon}</div><span className={`kpi-trend ${k.up ? "up" : "down"}`}>{k.trend}</span></div>
                    <div className="kpi-value">{k.value}</div>
                    <div className="kpi-label">{k.label}</div>
                  </div>
                ))}
              </div>
              <div className="charts-grid">
                <div className="chart-card">
                  <div className="chart-title">Sentiment Distribution</div>
                  <DonutChart pos={58} neg={22} neu={20} />
                  <div className="legend">
                    {[{ c: "#059669", l: "Positive 58%" }, { c: "#dc2626", l: "Negative 22%" }, { c: "#b45309", l: "Neutral 20%" }].map((l, i) => (
                      <div key={i} className="legend-item"><div className="legend-dot" style={{ background: l.c }} />{l.l}</div>
                    ))}
                  </div>
                </div>
                <div className="chart-card">
                  <div className="chart-title">Weekly Call Volume</div>
                  <div className="bar-chart">
                    {WEEKLY.map((d, i) => (
                      <div key={i} className="bar-row">
                        <div className="bar-day">{d.day}</div>
                        <div className="bar-track"><div className="bar-fill" style={{ width: `${(d.pos / 14) * 100}%`, background: `linear-gradient(90deg,var(--accent),#60a5fa)` }}><span className="bar-val">{d.calls}</span></div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="sec-hdr">
                <div className="sec-title">Recent Calls <span className="sec-sub">— last 4 meetings</span></div>
                <button className="btn" onClick={() => setPage("callhistory")}>View all →</button>
              </div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Meeting</th><th>Participants</th><th>Duration</th><th>Sentiment</th><th>Score</th><th>Actions</th></tr></thead>
                  <tbody>
                    {calls.slice(0, 4).map(c => (
                      <tr key={c.id} className={selected?.id === c.id ? "selected" : ""} onClick={() => { setSelected(c); setDrawerTab("sentiment"); }}>
                        <td><div className="ct-title">{c.title}</div><div className="ct-sub">{c.date} · {c.time} · #{c.channel}</div></td>
                        <td><div className="p-chips">{c.participants.slice(0, 3).map((p, i) => <div key={i} className="p-chip" style={{ background: p.c }}>{p.a}</div>)}{c.participants.length > 3 && <span className="p-more">+{c.participants.length - 3}</span>}</div></td>
                        <td><span className="ct-dur">{c.duration}</span></td>
                        <td><SentPill type={analyzingId === c.id ? "analyzing" : c.sentiment} /></td>
                        <td><ScoreBar score={c.score || 0.5} color={c.sentiment === "positive" ? "#059669" : c.sentiment === "negative" ? "#dc2626" : "#b45309"} /></td>
                        <td onClick={e => e.stopPropagation()}><div className="act-btns"><button className="act-btn" onClick={() => analyze(c)}>{analyzingId === c.id ? "⏳" : c.analyzed ? "View" : "Analyze"}</button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ── CALL HISTORY / TRANSCRIPTS ── */}
          {(page === "callhistory" || page === "transcripts") && (
            <>
              <div className="filter-row">
                {["all", "positive", "negative", "neutral", "mixed"].map(f => (
                  <button key={f} className={`filter-chip ${sentFilter === f ? "active" : ""}`} onClick={() => setSentFilter(f)}>
                    {f === "all" ? "All Calls" : SENT_MAP[f]?.label}
                  </button>
                ))}
                <div className="search-wrap">
                  <span style={{ color: "var(--muted)", fontSize: 13 }}>⌕</span>
                  <input className="search-inp" placeholder="Search meetings or participants…" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
              </div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Meeting</th><th>Date & Time</th><th>Participants</th><th>Duration</th><th>Sentiment</th><th>Score</th><th>Actions</th></tr></thead>
                  <tbody>
                    {filtered.map(c => (
                      <tr key={c.id} className={selected?.id === c.id ? "selected" : ""} onClick={() => { setSelected(c); setDrawerTab("sentiment"); }}>
                        <td><div className="ct-title">{c.title}</div><div className="ct-sub">#{c.channel}</div></td>
                        <td><div className="ct-date">{c.date}</div><div className="ct-date">{c.time}</div></td>
                        <td><div className="p-chips">{c.participants.slice(0, 4).map((p, i) => <div key={i} className="p-chip" style={{ background: p.c }}>{p.a}</div>)}{c.participants.length > 4 && <span className="p-more">+{c.participants.length - 4}</span>}</div></td>
                        <td><span className="ct-dur">{c.duration}</span></td>
                        <td><SentPill type={analyzingId === c.id ? "analyzing" : c.analyzed ? c.sentiment : "neutral"} /></td>
                        <td><ScoreBar score={c.analyzed ? (c.score || 0.5) : 0.5} color={c.sentiment === "positive" ? "#059669" : c.sentiment === "negative" ? "#dc2626" : "#b45309"} /></td>
                        <td onClick={e => e.stopPropagation()}>
                          <div className="act-btns">
                            <button className="act-btn" onClick={() => analyze(c)}>{analyzingId === c.id ? "⏳" : c.analyzed ? "View Analysis" : "Analyze"}</button>
                            <button className="act-btn" onClick={() => { setSelected(c); setDrawerTab("transcript"); }}>Transcript</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ── ALERTS ── */}
          {page === "alerts" && (
            <>
              <div className="sec-hdr"><div className="sec-title">Smart Alerts <span className="sec-sub">— AI-detected patterns</span></div></div>
              <div className="alerts-list">
                {ALERTS.map(a => (
                  <div key={a.id} className={`alert-card ${a.sev}`} onClick={() => toast(`Acknowledged: ${a.title}`)}>
                    <div className="alert-icon">{a.icon}</div>
                    <div style={{ flex: 1 }}><div className="alert-title">{a.title}</div><div className="alert-desc">{a.desc}</div><div className="alert-meta">{a.meta}</div></div>
                    <span className={`alert-sev ${a.sev}`}>{a.sev.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── DRAWER ── */}
      {selected && (
        <div className="drawer-overlay" onClick={e => { if (e.target.className === "drawer-overlay") setSelected(null); }}>
          <div className="drawer">
            <div className="drawer-hdr">
              <div className="drawer-title-row">
                <div><div className="drawer-title">{selected.title}</div><div className="drawer-meta">{selected.date} · {selected.time} · {selected.duration} · #{selected.channel}</div></div>
                <button className="close-btn" onClick={() => setSelected(null)}>✕</button>
              </div>
              <div className="drawer-stats">
                <div className="dstat"><div className="dstat-val">{selected.participants.length}</div><div className="dstat-lbl">Participants</div></div>
                <div className="dstat"><div className="dstat-val" style={{ color: selected.sentiment === "positive" ? "var(--positive)" : selected.sentiment === "negative" ? "var(--negative)" : "var(--neutral)" }}>{Math.round((selected.score || 0.5) * 100)}%</div><div className="dstat-lbl">Sentiment</div></div>
                <div className="dstat"><div className="dstat-val">{selected.transcript?.length || 0}</div><div className="dstat-lbl">Utterances</div></div>
              </div>
            </div>
            <div className="drawer-tabs">
              {[{ id: "sentiment", l: "Analysis" }, { id: "transcript", l: "Transcript" }, { id: "moments", l: "Key Moments" }].map(t => (
                <button key={t.id} className={`dtab ${drawerTab === t.id ? "active" : ""}`} onClick={() => setDrawerTab(t.id)}>{t.l}</button>
              ))}
            </div>
            <div className="drawer-body">

              {drawerTab === "sentiment" && (selected.analyzed ? (
                <>
                  {selected.aiSummary && <div className="ai-summary"><div className="ai-label">AI Summary (Claude)</div><div className="ai-text">{selected.aiSummary}</div></div>}
                  <div className="sent-card">
                    <div className="sent-card-title">Overall Breakdown</div>
                    <div className="overall-row">
                      <div className="os-emoji">{SENT_MAP[selected.sentiment]?.emoji}</div>
                      <div><div className="os-label" style={{ color: selected.sentiment === "positive" ? "var(--positive)" : selected.sentiment === "negative" ? "var(--negative)" : "var(--neutral)" }}>{SENT_MAP[selected.sentiment]?.label}</div><div className="os-score">Confidence: {Math.round((selected.score || 0.5) * 100)}%</div></div>
                    </div>
                    <div className="sent-bars">
                      {[{ l: "Positive", v: selected.pos, c: "#059669" }, { l: "Negative", v: selected.neg, c: "#dc2626" }, { l: "Neutral", v: selected.neu, c: "#b45309" }].map((b, i) => (
                        <div key={i} className="sbar-row"><div className="sbar-lbl">{b.l}</div><div className="sbar-track"><div className="sbar-fill" style={{ width: `${b.v}%`, background: b.c }} /></div><div className="sbar-pct">{b.v}%</div></div>
                      ))}
                    </div>
                  </div>
                  {selected.timeline && <div className="timeline-wrap"><div className="timeline-label">Sentiment Over Time</div><div className="tl-bars">{selected.timeline.map((v, i) => <div key={i} className="tl-bar" style={{ height: `${Math.round(v * 100)}%`, background: v > 0.65 ? "#059669" : v < 0.4 ? "#dc2626" : "#b45309", opacity: 0.75 }} title={`${Math.round(v * 100)}%`} />)}</div></div>}
                  {selected.speakerSentiments?.length > 0 && (
                    <>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.6px", fontFamily: "var(--mono)", marginBottom: 8, marginTop: 4 }}>Per Speaker</div>
                      <div className="spkr-list">
                        {selected.speakerSentiments.map((s, i) => (
                          <div key={i} className="spkr-card">
                            <div className="spkr-top">
                              <div className="spkr-ava" style={{ background: s.color }}>{s.avatar}</div>
                              <div><div className="spkr-name">{s.name}</div><div className="spkr-role">{s.chars} chars</div></div>
                              <div style={{ marginLeft: "auto" }}><SentPill type={s.sentiment} /></div>
                            </div>
                            <ScoreBar score={s.score || 0.5} color={s.sentiment === "positive" ? "#059669" : s.sentiment === "negative" ? "#dc2626" : "#b45309"} />
                            {s.insight && <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 7, lineHeight: 1.55 }}>{s.insight}</div>}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="ai-empty">
                  {analyzingId === selected.id ? <><div className="ai-spinner" /><div className="ai-empty-text">Claude AI is analyzing…</div><div className="ai-empty-sub">Processing sentiment patterns</div></>
                    : <><div style={{ fontSize: 36 }}>🧠</div><div className="ai-empty-text">Not analyzed yet</div><button className="btn btn-primary" style={{ marginTop: 6 }} onClick={() => analyze(selected)}>Run Sentiment Analysis</button></>}
                </div>
              ))}

              {drawerTab === "transcript" && (
                <div className="trans-view">
                  {selected.transcript?.map(t => (
                    <div key={t.id} className={`tv-entry ${t.sentiment}`}>
                      <div className="tv-hdr"><span className="tv-spkr">{t.speaker}</span><span className="tv-time">{t.time}</span></div>
                      <div className="tv-text">{t.text}</div>
                      {t.sentiment && <div className="tv-sent" style={{ color: t.sentiment === "positive" ? "var(--positive)" : t.sentiment === "negative" ? "var(--negative)" : "var(--neutral)" }}>{SENT_MAP[t.sentiment]?.emoji} {t.sentiment}</div>}
                    </div>
                  ))}
                  <button className="btn" style={{ marginTop: 4 }} onClick={() => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([selected.transcript?.map(t => `[${t.time}] ${t.speaker}: ${t.text}`).join("\n") || ""], { type: "text/plain" })); a.download = `${selected.title}.txt`; a.click(); toast("Transcript downloaded"); }}>↓ Download Transcript</button>
                </div>
              )}

              {drawerTab === "moments" && (
                selected.analyzed && selected.keyMoments?.length > 0 ? (
                  <div className="moment-list">
                    {selected.keyMoments.map((m, i) => (
                      <div key={i} className={`moment-card ${m.type}`}>
                        <div className="moment-top"><span className="moment-spkr">{m.speaker}</span><span className="moment-time">{m.time}</span></div>
                        <div className="moment-txt">"{m.text}"</div>
                        <div className="moment-tag" style={{ color: m.type === "positive" ? "var(--positive)" : m.type === "negative" ? "var(--negative)" : "var(--muted)" }}>{SENT_MAP[m.type]?.emoji} {m.type?.charAt(0).toUpperCase() + m.type?.slice(1)} moment</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="ai-empty">
                    <div style={{ fontSize: 34 }}>⚡</div>
                    <div className="ai-empty-text">{selected.analyzed ? "No key moments found" : "Analyze this call first"}</div>
                    {!selected.analyzed && <button className="btn btn-primary" style={{ marginTop: 6 }} onClick={() => analyze(selected)}>Run Analysis</button>}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      <div className="toast-stack">{toasts.map(t => <div key={t.id} className="toast-item">{t.msg}</div>)}</div>
    </div>
  );
}
window.AdminPortal = AdminPortal;
