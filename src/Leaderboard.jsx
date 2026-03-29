import { useState, useEffect, useRef } from "react";

const DATA = {
    wins: {
        label: "TOP WINS",
        mode: "DUELS",
        accent: "#E8B630",
        accentRgb: "232,182,48",
        players: [
            { rank: 1, name: "Death_Yk6800", val: 625 },
            { rank: 2, name: "bloeod", val: 612 },
            { rank: 3, name: "DavidPlay156", val: 529 },
            { rank: 4, name: "_Rasi", val: 467 },
            { rank: 5, name: "K502", val: 457 },
            { rank: 6, name: "Pxlars_", val: 449 },
            { rank: 7, name: "obzixx", val: 444 },
            { rank: 8, name: "kxile", val: 421 },
            { rank: 9, name: "Shard28", val: 413 },
            { rank: 10, name: "strixxx_", val: 400 },
        ],
    },
    kills: {
        label: "TOP KILLS",
        mode: "FFA",
        accent: "#E04040",
        accentRgb: "224,64,64",
        players: [
            { rank: 1, name: "CraftedFish", val: 827 },
            { rank: 2, name: "ClintsThurbs", val: 497 },
            { rank: 3, name: "lionbud11", val: 410 },
            { rank: 4, name: "Chaos_but_dumb", val: 383 },
            { rank: 5, name: "decode3", val: 358 },
            { rank: 6, name: "mhasterghost1", val: 309 },
            { rank: 7, name: "h_37", val: 250 },
            { rank: 8, name: "Ok48", val: 234 },
            { rank: 9, name: "flowpvpgg", val: 232 },
            { rank: 10, name: "4pxs", val: 225 },
        ],
    },
    streaks: {
        label: "WIN STREAKS",
        mode: "DUELS",
        accent: "#E07020",
        accentRgb: "224,112,32",
        players: [
            { rank: 1, name: "fleexvega", val: 136 },
            { rank: 2, name: "Pxlars_", val: 95 },
            { rank: 3, name: "TinkyKchero", val: 93 },
            { rank: 4, name: "_Stxrmy", val: 80 },
            { rank: 5, name: "_Pream", val: 65 },
            { rank: 6, name: "yaplit", val: 62 },
            { rank: 7, name: "superkarlos1", val: 60 },
            { rank: 8, name: "oedk", val: 57 },
            { rank: 9, name: "notrani", val: 56 },
            { rank: 10, name: "wil_7", val: 55 },
        ],
    },
};

const MEDALS = { 1: "\u{1F947}", 2: "\u{1F948}", 3: "\u{1F949}" };

function SkinModal({ username, onClose }) {
    const canvasRef = useRef(null);
    const viewerRef = useRef(null);

    useEffect(() => {
        let dead = false;
        (async () => {
            if (!canvasRef.current) return;
            if (!window.skinview3d) {
                await new Promise((res, rej) => {
                    const s = document.createElement("script");
                    s.src = "https://cdn.jsdelivr.net/npm/skinview3d@3.0.2/bundles/skinview3d.bundle.min.js";
                    s.onload = res;
                    s.onerror = rej;
                    document.head.appendChild(s);
                });
            }
            if (dead) return;
            const v = new window.skinview3d.SkinViewer({
                canvas: canvasRef.current,
                width: 300,
                height: 440,
                skin: `https://vzge.me/skin/${username}`,
            });
            v.autoRotate = true;
            v.autoRotateSpeed = 0.5;
            v.zoom = 0.82;
            v.fov = 45;
            v.animation = new window.skinview3d.IdleAnimation();
            v.animation.speed = 1;
            viewerRef.current = v;
        })();
        return () => {
            dead = true;
            viewerRef.current?.dispose();
        };
    }, [username]);

    const allStats = Object.entries(DATA)
        .map(([k, c]) => {
            const f = c.players.find(
                (p) => p.name.toLowerCase() === username.toLowerCase()
            );
            return f
                ? {
                    key: k,
                    label: c.label,
                    mode: c.mode,
                    accent: c.accent,
                    rank: f.rank,
                    val: f.val,
                }
                : null;
        })
        .filter(Boolean);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                <div className="modal-layout">
                    <div className="viewer-container">
                        <div className="viewer-glow" />
                        <canvas
                            ref={canvasRef}
                            style={{ display: "block", borderRadius: 12 }}
                        />
                        <div className="viewer-floor" />
                    </div>

                    <div className="modal-info">
                        <div className="modal-header-row">
                            <img
                                src={`https://vzge.me/face/48/${username}`}
                                alt=""
                                className="modal-face"
                            />
                            <div>
                                <h2 className="modal-username">{username}</h2>
                                <span className="modal-tag">PLAYER PROFILE</span>
                            </div>
                        </div>

                        <div className="modal-stats">
                            {allStats.map((s) => (
                                <div
                                    key={s.key}
                                    className="modal-stat-row"
                                    style={{ "--sa": s.accent }}
                                >
                                    <div className="stat-left">
                    <span className="stat-rank" style={{ color: s.accent }}>
                      #{s.rank}
                    </span>
                                        <div className="stat-texts">
                                            <span className="stat-cat">{s.label}</span>
                                            <span className="stat-mode">{s.mode}</span>
                                        </div>
                                    </div>
                                    <span className="stat-val" style={{ color: s.accent }}>
                    {s.val.toLocaleString()}
                  </span>
                                </div>
                            ))}
                            {allStats.length === 0 && (
                                <div
                                    className="modal-stat-row"
                                    style={{ "--sa": "#555" }}
                                >
                  <span className="stat-cat" style={{ opacity: 0.35 }}>
                    No ranked stats found
                  </span>
                                </div>
                            )}
                        </div>

                        <div className="modal-actions">
                            <a
                                href={`https://namemc.com/profile/${username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="action-btn"
                            >
                                NameMC
                                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                    <path d="M4 1h7v7M11 1L4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <a
                                href={`https://laby.net/@${username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="action-btn"
                            >
                                Laby.net
                                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                    <path d="M4 1h7v7M11 1L4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PlayerCard({ player, accent, accentRgb, maxVal, index, onClick }) {
    const top3 = player.rank <= 3;
    return (
        <div
            className={`player-card${top3 ? " top3" : ""}`}
            style={{
                "--accent": accent,
                "--ar": accentRgb,
                animationDelay: `${index * 45 + 60}ms`,
            }}
            onClick={onClick}
        >
            <div className="pc-rank">
                {top3 ? (
                    <span className="pc-medal">{MEDALS[player.rank]}</span>
                ) : (
                    <span className="pc-rank-num">#{player.rank}</span>
                )}
            </div>
            <img
                src={`https://vzge.me/face/36/${player.name}`}
                alt=""
                className="pc-face"
                loading="lazy"
            />
            <span className="pc-name">{player.name}</span>
            <div className="pc-bar-track">
                <div
                    className="pc-bar-fill"
                    style={{ width: `${(player.val / maxVal) * 100}%` }}
                />
            </div>
            <span className="pc-val">{player.val.toLocaleString()}</span>
        </div>
    );
}

export default function App() {
    const [tab, setTab] = useState("wins");
    const [selected, setSelected] = useState(null);
    const cat = DATA[tab];
    const maxVal = cat.players[0]?.val || 1;

    return (
        <div className="app">
            <style>{CSS}</style>

            <div className="bg-noise" />
            <div className="bg-glow" />
            <div className="bg-glow2" />

            <header className="top-bar">
                <img
                    src="https://via.placeholder.com/200x64/111116/e8b630?text=YOUR+LOGO"
                    alt="Server Logo"
                    className="logo-img"
                />
                <div className="header-divider" />
                <h1 className="main-title">LEADERBOARD</h1>
                <p className="main-sub">SEASON RANKINGS &bull; LIVE</p>
            </header>

            <nav className="tab-bar">
                {Object.entries(DATA).map(([id, c]) => (
                    <button
                        key={id}
                        className={`tab-btn${tab === id ? " active" : ""}`}
                        style={{ "--ta": c.accent, "--tar": c.accentRgb }}
                        onClick={() => setTab(id)}
                    >
                        <span className="tab-label">{c.label}</span>
                        <span className="tab-mode">{c.mode}</span>
                        {tab === id && <div className="tab-line" />}
                    </button>
                ))}
            </nav>

            <div className="board-head">
                <div className="bh-left">
                    <div className="bh-pip" style={{ background: cat.accent, boxShadow: `0 0 8px ${cat.accent}44` }} />
                    <span className="bh-title">{cat.label}</span>
                    <span className="bh-badge" style={{ color: cat.accent, borderColor: `${cat.accent}33` }}>{cat.mode}</span>
                </div>
                <span className="bh-meta">{cat.players.length} PLAYERS</span>
            </div>

            <div className="col-labels">
                <span style={{ width: 44 }}>RANK</span>
                <span style={{ flex: 1, paddingLeft: 46 }}>PLAYER</span>
                <span style={{ width: 70, textAlign: "right" }}>SCORE</span>
            </div>

            <div className="board" key={tab}>
                {cat.players.map((p, i) => (
                    <PlayerCard
                        key={p.name + tab}
                        player={p}
                        accent={cat.accent}
                        accentRgb={cat.accentRgb}
                        maxVal={maxVal}
                        index={i}
                        onClick={() => setSelected(p.name)}
                    />
                ))}
            </div>

            <footer className="foot">
                Data sourced from in-game leaderboards
            </footer>

            {selected && (
                <SkinModal username={selected} onClose={() => setSelected(null)} />
            )}
        </div>
    );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

.app{
  min-height:100vh;
  background:#09090c;
  color:#c8c8cc;
  font-family:'Outfit',sans-serif;
  position:relative;
  overflow-x:hidden;
  max-width:760px;
  margin:0 auto;
  padding:0 20px 48px;
}

/* backgrounds */
.bg-noise{
  position:fixed;inset:0;pointer-events:none;z-index:0;
  opacity:0.025;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat:repeat;
  background-size:200px;
}
.bg-glow{
  position:fixed;top:-180px;left:50%;transform:translateX(-50%);
  width:700px;height:500px;pointer-events:none;z-index:0;
  background:radial-gradient(ellipse,rgba(232,182,48,0.045) 0%,transparent 60%);
}
.bg-glow2{
  position:fixed;bottom:-200px;right:-100px;
  width:500px;height:500px;pointer-events:none;z-index:0;
  background:radial-gradient(circle,rgba(224,64,64,0.02) 0%,transparent 60%);
}

/* header */
.top-bar{
  position:relative;z-index:1;
  display:flex;flex-direction:column;align-items:center;
  padding:44px 0 16px;gap:12px;
}
.logo-img{
  height:64px;width:auto;object-fit:contain;
  border-radius:8px;
  transition:transform 0.3s ease;
}
.logo-img:hover{transform:scale(1.02)}
.header-divider{
  width:48px;height:1px;
  background:linear-gradient(90deg,transparent,rgba(232,182,48,0.35),transparent);
  margin:4px 0;
}
.main-title{
  font-family:'Rajdhani',sans-serif;
  font-size:2.2rem;font-weight:700;
  letter-spacing:12px;color:#f2f2f2;
  line-height:1;
}
.main-sub{
  font-size:0.58rem;letter-spacing:5px;
  color:rgba(255,255,255,0.18);font-weight:400;
}

/* tabs */
.tab-bar{
  position:relative;z-index:1;
  display:flex;gap:4px;
  margin:20px 0 28px;padding:4px;
  background:rgba(255,255,255,0.018);
  border:1px solid rgba(255,255,255,0.04);
  border-radius:14px;
}
.tab-btn{
  flex:1;position:relative;
  display:flex;flex-direction:column;align-items:center;
  gap:1px;padding:13px 8px 15px;
  background:transparent;border:none;
  border-radius:10px;cursor:pointer;
  color:rgba(255,255,255,0.25);
  transition:all 0.2s ease;
  font-family:'Outfit',sans-serif;
}
.tab-btn:hover{color:rgba(255,255,255,0.45);background:rgba(255,255,255,0.02)}
.tab-btn.active{
  color:var(--ta);
  background:rgba(var(--tar),0.055);
}
.tab-label{
  font-family:'Rajdhani',sans-serif;
  font-size:0.75rem;font-weight:700;
  letter-spacing:2.5px;
}
.tab-mode{
  font-size:0.5rem;letter-spacing:2px;
  opacity:0.45;
}
.tab-line{
  position:absolute;bottom:5px;left:50%;
  transform:translateX(-50%);
  width:18px;height:2px;
  background:var(--ta);border-radius:2px;
  animation:lineIn 0.25s ease;
}

/* board header */
.board-head{
  position:relative;z-index:1;
  display:flex;align-items:center;
  justify-content:space-between;
  margin-bottom:6px;padding:0 4px;
}
.bh-left{display:flex;align-items:center;gap:10px}
.bh-pip{width:5px;height:5px;border-radius:50%;flex-shrink:0}
.bh-title{
  font-family:'Rajdhani',sans-serif;
  font-size:0.85rem;font-weight:700;
  letter-spacing:2px;color:#ddd;
}
.bh-badge{
  font-size:0.5rem;font-weight:600;
  letter-spacing:2.5px;padding:2px 8px;
  border:1px solid;border-radius:4px;
}
.bh-meta{
  font-size:0.5rem;letter-spacing:3px;
  color:rgba(255,255,255,0.12);
}

.col-labels{
  position:relative;z-index:1;
  display:flex;align-items:center;
  padding:0 16px 6px;gap:12px;
  font-size:0.45rem;letter-spacing:3px;
  color:rgba(255,255,255,0.1);font-weight:600;
}

.board{
  position:relative;z-index:1;
  display:flex;flex-direction:column;gap:2px;
}

/* player card */
.player-card{
  display:flex;align-items:center;gap:12px;
  padding:10px 16px;
  border-radius:10px;
  border:1px solid rgba(255,255,255,0.03);
  background:rgba(255,255,255,0.012);
  cursor:pointer;
  transition:all 0.18s ease;
  animation:rowSlide 0.35s ease both;
}
.player-card:hover{
  background:rgba(var(--ar),0.055);
  border-color:rgba(var(--ar),0.14);
  transform:translateX(3px);
  box-shadow:0 2px 20px rgba(var(--ar),0.04);
}
.player-card.top3{
  background:rgba(var(--ar),0.025);
  border-color:rgba(var(--ar),0.06);
}
.pc-rank{width:32px;text-align:center;flex-shrink:0}
.pc-medal{font-size:1.15rem}
.pc-rank-num{
  font-family:'Rajdhani',sans-serif;
  font-size:0.8rem;font-weight:700;
  color:rgba(255,255,255,0.16);
}
.pc-face{
  width:30px;height:30px;
  border-radius:6px;flex-shrink:0;
  image-rendering:pixelated;
  background:rgba(255,255,255,0.03);
  border:1px solid rgba(255,255,255,0.05);
}
.pc-name{
  font-size:0.82rem;font-weight:500;
  color:#ddd;flex:1;
  letter-spacing:0.2px;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
}
.pc-bar-track{
  width:70px;height:3px;
  background:rgba(255,255,255,0.03);
  border-radius:3px;overflow:hidden;flex-shrink:0;
  display:none;
}
@media(min-width:580px){.pc-bar-track{display:block}}
.pc-bar-fill{
  height:100%;border-radius:3px;
  background:var(--accent);opacity:0.3;
  transition:width 0.5s ease;
}
.pc-val{
  font-family:'Rajdhani',sans-serif;
  font-size:0.9rem;font-weight:700;
  color:var(--accent);flex-shrink:0;
  min-width:48px;text-align:right;
}

/* modal */
.modal-overlay{
  position:fixed;inset:0;z-index:999;
  background:rgba(4,4,6,0.85);
  backdrop-filter:blur(16px);
  display:flex;align-items:center;justify-content:center;
  padding:16px;
  animation:fadeBg 0.2s ease;
}
.modal-box{
  background:linear-gradient(165deg,#111118 0%,#0c0c10 100%);
  border:1px solid rgba(255,255,255,0.06);
  border-radius:22px;
  padding:36px;
  max-width:640px;width:100%;
  position:relative;
  animation:popIn 0.3s cubic-bezier(0.16,1,0.3,1);
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.03),
    0 40px 100px rgba(0,0,0,0.55),
    inset 0 1px 0 rgba(255,255,255,0.04);
}
.modal-close{
  position:absolute;top:16px;right:16px;
  width:34px;height:34px;border-radius:10px;
  background:rgba(255,255,255,0.035);
  border:1px solid rgba(255,255,255,0.05);
  color:rgba(255,255,255,0.3);
  cursor:pointer;display:flex;
  align-items:center;justify-content:center;
  transition:all 0.15s;
}
.modal-close:hover{background:rgba(255,255,255,0.07);color:#fff}
.modal-layout{
  display:flex;gap:30px;
  align-items:stretch;
  flex-wrap:wrap;justify-content:center;
}
.viewer-container{
  position:relative;flex-shrink:0;
  border-radius:16px;overflow:hidden;
  background:radial-gradient(ellipse at 50% 85%,#16162a 0%,#0a0a0f 100%);
  border:1px solid rgba(255,255,255,0.04);
}
.viewer-glow{
  position:absolute;bottom:0;left:50%;
  transform:translateX(-50%);
  width:140px;height:35px;
  background:radial-gradient(ellipse,rgba(232,182,48,0.07),transparent 70%);
  pointer-events:none;z-index:1;
}
.viewer-floor{
  position:absolute;bottom:0;left:0;right:0;
  height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent);
}
.modal-info{
  flex:1;min-width:190px;
  display:flex;flex-direction:column;
  gap:18px;padding:2px 0;
}
.modal-header-row{display:flex;align-items:center;gap:14px}
.modal-face{
  width:48px;height:48px;
  border-radius:10px;image-rendering:pixelated;
  background:rgba(255,255,255,0.03);
  border:2px solid rgba(255,255,255,0.07);
}
.modal-username{
  font-family:'Rajdhani',sans-serif;
  font-size:1.35rem;font-weight:700;
  color:#f0f0f0;letter-spacing:1px;
  line-height:1.1;
}
.modal-tag{
  font-size:0.52rem;letter-spacing:3.5px;
  color:rgba(255,255,255,0.16);font-weight:500;
}
.modal-stats{display:flex;flex-direction:column;gap:5px}
.modal-stat-row{
  display:flex;align-items:center;
  justify-content:space-between;
  padding:10px 14px;
  background:rgba(255,255,255,0.018);
  border-radius:10px;
  border:1px solid rgba(255,255,255,0.03);
  border-left:3px solid var(--sa);
  transition:background 0.15s;
}
.modal-stat-row:hover{background:rgba(255,255,255,0.03)}
.stat-left{display:flex;align-items:center;gap:12px}
.stat-rank{
  font-family:'Rajdhani',sans-serif;
  font-size:1.05rem;font-weight:700;
  min-width:28px;
}
.stat-texts{display:flex;flex-direction:column}
.stat-cat{
  font-size:0.6rem;font-weight:600;
  letter-spacing:2px;color:rgba(255,255,255,0.45);
}
.stat-mode{
  font-size:0.45rem;letter-spacing:2.5px;
  color:rgba(255,255,255,0.15);
}
.stat-val{
  font-family:'Rajdhani',sans-serif;
  font-size:1.05rem;font-weight:700;
}
.modal-actions{
  display:flex;gap:7px;margin-top:auto;flex-wrap:wrap;
}
.action-btn{
  display:inline-flex;align-items:center;gap:6px;
  padding:8px 14px;
  font-size:0.6rem;font-weight:600;
  letter-spacing:1.5px;text-transform:uppercase;
  color:rgba(255,255,255,0.35);
  background:rgba(255,255,255,0.025);
  border:1px solid rgba(255,255,255,0.05);
  border-radius:8px;
  text-decoration:none;
  transition:all 0.15s;
  font-family:'Outfit',sans-serif;
}
.action-btn:hover{
  color:rgba(255,255,255,0.75);
  background:rgba(255,255,255,0.05);
  border-color:rgba(255,255,255,0.1);
}

/* footer */
.foot{
  position:relative;z-index:1;
  text-align:center;padding:36px 0 0;
  font-size:0.48rem;letter-spacing:3.5px;
  color:rgba(255,255,255,0.07);text-transform:uppercase;
}

/* keyframes */
@keyframes rowSlide{
  from{opacity:0;transform:translateY(6px)}
  to{opacity:1;transform:translateY(0)}
}
@keyframes fadeBg{
  from{opacity:0}to{opacity:1}
}
@keyframes popIn{
  from{opacity:0;transform:scale(0.93) translateY(10px)}
  to{opacity:1;transform:scale(1) translateY(0)}
}
@keyframes lineIn{
  from{opacity:0;transform:translateX(-50%) scaleX(0)}
  to{opacity:1;transform:translateX(-50%) scaleX(1)}
}

@media(max-width:540px){
  .modal-box{padding:22px 16px}
  .modal-layout{gap:18px}
  .main-title{font-size:1.5rem;letter-spacing:8px}
  .viewer-container canvas{width:220px!important;height:330px!important}
}
`;