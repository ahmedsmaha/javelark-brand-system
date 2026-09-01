import { useState } from "react";

// ─── JAVELARK BRAND IDENTITY SYSTEM ───────────────────────────────────────────
// Stance:    Kinetic · dark ground · light motion highlights
// Language:  24° angular chamfer throughout — all cuts and accents
// Palette:   VOID #07080A · CHALK #EEEEE9 · VOLT #BBFF33
// Type:      Barlow Condensed 800 (display) · Outfit 300/400 (body) · JetBrains Mono (labels)
// Mark:      J/V composite — bold polygon with 24° junction, VOLT accent encodes V within J
//            Key points: (42,68)→(66,79) atan(11/24)≈24.6° ✓

const BC = "'Barlow Condensed', sans-serif";
const OT = "'Outfit', sans-serif";
const JB = "'JetBrains Mono', monospace";

// ─── SVG MARK ─────────────────────────────────────────────────────────────────
// viewBox 0 0 74 100
// Outer J polygon: 8,0 → 42,0 → 42,68 → 66,79 → 66,100 → 8,100
// 24° junction at (42,68)→(66,79): Δx=24 Δy=11 → atan(11/24)=24.6° ✓
// VOLT accent triangle (42,68)→(66,79)→(66,100)→(50,100): V within J via negative read

interface MarkProps {
  fill?: string;
  accentFill?: string;
  size?: number;
  showAccent?: boolean;
  className?: string;
}

function JavelarkMark({
  fill = "#EEEEE9",
  accentFill = "#BBFF33",
  size = 80,
  showAccent = true,
  className = "",
}: MarkProps) {
  const w = (74 / 100) * size;
  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 74 100"
      fill="none"
      className={className}
      aria-label="JAVELARK mark"
    >
      <polygon points="8,0 42,0 42,68 66,79 66,100 8,100" fill={fill} />
      {showAccent && (
        <polygon points="42,68 66,79 66,100 50,100" fill={accentFill} />
      )}
    </svg>
  );
}

// ─── SHARED PRIMITIVES ────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: JB,
        fontSize: "10px",
        letterSpacing: "0.18em",
        color: "#3D4150",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function SectionHeader({
  index,
  title,
  sub,
}: {
  index: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-5 mb-2">
        <Label>{index}</Label>
        <h2
          style={{
            fontFamily: BC,
            fontWeight: 800,
            fontSize: "clamp(32px,5vw,52px)",
            letterSpacing: "-0.01em",
            color: "#EEEEE9",
            lineHeight: 1,
          }}
        >
          {title}
        </h2>
      </div>
      {sub && (
        <p
          className="max-w-lg mt-3"
          style={{
            fontFamily: OT,
            fontSize: "15px",
            color: "#6B7280",
            lineHeight: 1.65,
            fontWeight: 300,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

interface CardProps {
  bg?: string;
  label?: string;
  children: React.ReactNode;
  chamfer?: boolean;
  style?: React.CSSProperties;
}

function Card({ bg = "#0E1013", label, children, chamfer, style }: CardProps) {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        background: bg,
        border: "1px solid #1A1D24",
        minHeight: "200px",
        clipPath: chamfer
          ? "polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%)"
          : undefined,
        ...style,
      }}
    >
      {children}
      {label && (
        <span
          className="absolute bottom-3 right-4"
          style={{
            fontFamily: JB,
            fontSize: "9px",
            letterSpacing: "0.15em",
            color: "#2A2D35",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

// ─── WORDMARK ACCENT BAR ──────────────────────────────────────────────────────
function AccentBar({
  color = "#BBFF33",
  opacity = 1,
}: {
  color?: string;
  opacity?: number;
}) {
  return (
    <div
      style={{
        marginTop: "7px",
        height: "3px",
        background: color,
        transform: "skewX(-24deg)",
        transformOrigin: "left center",
        opacity,
      }}
    />
  );
}

// ─── WORDMARK RENDERER ────────────────────────────────────────────────────────
function Wordmark({
  size = 64,
  color = "#EEEEE9",
  accentColor = "#BBFF33",
  showAccent = true,
  tracking = "0.06em",
}: {
  size?: number;
  color?: string;
  accentColor?: string;
  showAccent?: boolean;
  tracking?: string;
}) {
  return (
    <div>
      <div
        style={{
          fontFamily: BC,
          fontWeight: 800,
          fontSize: `${size}px`,
          letterSpacing: tracking,
          color,
          lineHeight: 1,
        }}
      >
        JAVELARK
      </div>
      {showAccent && <AccentBar color={accentColor} />}
    </div>
  );
}

// ─── CHAMFERED BADGE CONTAINER ────────────────────────────────────────────────
function Badge({
  bg = "#0E1013",
  border = "1px solid #1A1D24",
  children,
}: {
  bg?: string;
  border?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        padding: "28px 32px 24px",
        background: bg,
        border,
        clipPath:
          "polygon(0 0,calc(100% - 22px) 0,100% 22px,100% 100%,0 100%)",
      }}
    >
      {children}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [usageTheme, setUsageTheme] = useState<"dark" | "light" | "color">(
    "dark"
  );

  return (
    <div
      style={{
        background: "#07080A",
        color: "#EEEEE9",
        fontFamily: OT,
        minHeight: "100%",
      }}
    >
      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{
          padding: "16px 40px",
          borderBottom: "1px solid #141619",
          background: "rgba(7,8,10,0.9)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="flex items-center gap-3">
          <JavelarkMark size={28} />
          <span
            style={{
              fontFamily: BC,
              fontWeight: 800,
              fontSize: "15px",
              letterSpacing: "0.2em",
              color: "#EEEEE9",
            }}
          >
            JAVELARK
          </span>
        </div>
        <Label>Brand Identity System · 2026</Label>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ minHeight: "100vh", paddingTop: "80px" }}
      >
        {/* Background 24° grid lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.035 }}
          preserveAspectRatio="none"
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <line
              key={i}
              x1={`${-30 + i * 12}%`}
              y1="0%"
              x2={`${-30 + i * 12 + 70}%`}
              y2="100%"
              stroke="#BBFF33"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Radial glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(187,255,51,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="relative text-center" style={{ padding: "0 32px" }}>
          <div className="flex justify-center mb-10">
            <JavelarkMark size={160} />
          </div>

          <h1
            style={{
              fontFamily: BC,
              fontWeight: 800,
              fontSize: "clamp(72px,15vw,180px)",
              letterSpacing: "-0.02em",
              lineHeight: 0.88,
              color: "#EEEEE9",
              marginBottom: "24px",
            }}
          >
            JAVELARK
          </h1>

          <p
            style={{
              fontFamily: OT,
              fontSize: "15px",
              color: "#6B7280",
              letterSpacing: "0.25em",
              fontWeight: 300,
              marginBottom: "32px",
              textTransform: "uppercase",
            }}
          >
            Brand Identity System
          </p>

          {/* 24° accent bar */}
          <div className="flex justify-center">
            <div
              style={{
                width: "140px",
                height: "3px",
                background: "#BBFF33",
                transform: "skewX(-24deg)",
              }}
            />
          </div>
        </div>

        <div
          className="absolute bottom-10"
          style={{ color: "#2A2D35" }}
        >
          <Label>↓ Three directions below</Label>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────────── */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "100px 40px 120px",
        }}
      >
        {/* ════════════════════════════════════════════════════════════════════
            DIRECTION 01 — EDGE: GEOMETRIC WORDMARK
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: "100px" }}>
          <SectionHeader
            index="Direction 01"
            title="EDGE — Geometric Wordmark"
            sub="Typographic-first identity. The 24° parallelogram accent below the wordmark is the sole geometric element — angular precision without a symbol. Ideal for editorial, print, and wide-format digital."
          />

          {/* Primary + Reversed */}
          <div
            className="grid gap-4 mb-4"
            style={{ gridTemplateColumns: "5fr 3fr" }}
          >
            <Card bg="#07080A" label="Primary · Dark ground" style={{ minHeight: "260px" }}>
              <div style={{ padding: "48px 56px" }}>
                <Wordmark size={72} />
              </div>
            </Card>
            <Card bg="#EEEEE9" label="Reversed · Light ground" style={{ minHeight: "260px" }}>
              <div style={{ padding: "40px 44px" }}>
                <Wordmark
                  size={48}
                  color="#07080A"
                  accentColor="#07080A"
                />
              </div>
            </Card>
          </div>

          {/* Three variants */}
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            <Card bg="#BBFF33" label="Volt ground">
              <div style={{ padding: "36px 40px" }}>
                <Wordmark
                  size={38}
                  color="#07080A"
                  accentColor="#07080A"
                  showAccent={true}
                />
              </div>
            </Card>

            <Card bg="#0E1013" label="Monochrome · Single color">
              <div style={{ padding: "36px 40px" }}>
                <div
                  style={{
                    fontFamily: BC,
                    fontWeight: 800,
                    fontSize: "38px",
                    letterSpacing: "0.06em",
                    color: "#EEEEE9",
                    lineHeight: 1,
                  }}
                >
                  JAVELARK
                </div>
                <AccentBar color="#EEEEE9" opacity={0.35} />
              </div>
            </Card>

            <Card bg="#07080A" label="Ghost / Outline">
              <div style={{ padding: "36px 40px" }}>
                <div
                  style={{
                    fontFamily: BC,
                    fontWeight: 800,
                    fontSize: "38px",
                    letterSpacing: "0.06em",
                    color: "transparent",
                    lineHeight: 1,
                    WebkitTextStroke: "1.5px #EEEEE9",
                  } as React.CSSProperties}
                >
                  JAVELARK
                </div>
                <AccentBar color="#EEEEE9" opacity={0.2} />
              </div>
            </Card>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            DIRECTION 02 — VECTOR: MARK + WORDMARK
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: "100px" }}>
          <SectionHeader
            index="Direction 02"
            title="VECTOR — Mark + Wordmark"
            sub="The primary brand lockup. The J/V composite mark — a bold angular polygon with a precise 24° chamfer — pairs with the condensed wordmark. The VOLT accent triangle at the junction encodes V within the J form. Scales from billboard to digital header."
          />

          {/* Large primary horizontal lockup */}
          <div className="mb-4">
            <Card bg="#07080A" label="Horizontal lockup · Primary" style={{ minHeight: "280px" }}>
              <div
                className="flex items-center"
                style={{ gap: "28px", padding: "56px 64px" }}
              >
                <JavelarkMark size={100} />
                <div
                  style={{
                    width: "1px",
                    height: "80px",
                    background: "#1C1F26",
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    fontFamily: BC,
                    fontWeight: 800,
                    fontSize: "64px",
                    letterSpacing: "0.06em",
                    color: "#EEEEE9",
                    lineHeight: 1,
                  }}
                >
                  JAVELARK
                </div>
              </div>
            </Card>
          </div>

          <div
            className="grid gap-4 mb-4"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            {/* Reversed */}
            <Card bg="#EEEEE9" label="Light ground" style={{ minHeight: "200px" }}>
              <div
                className="flex items-center"
                style={{ gap: "20px", padding: "36px 44px" }}
              >
                <JavelarkMark
                  size={64}
                  fill="#07080A"
                  accentFill="#07080A"
                  showAccent={false}
                />
                <div
                  style={{
                    width: "1px",
                    height: "52px",
                    background: "#C8C8C4",
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    fontFamily: BC,
                    fontWeight: 800,
                    fontSize: "40px",
                    letterSpacing: "0.06em",
                    color: "#07080A",
                  }}
                >
                  JAVELARK
                </div>
              </div>
            </Card>

            {/* Volt ground */}
            <Card bg="#BBFF33" label="Volt ground" style={{ minHeight: "200px" }}>
              <div
                className="flex items-center"
                style={{ gap: "20px", padding: "36px 44px" }}
              >
                <JavelarkMark
                  size={64}
                  fill="#07080A"
                  accentFill="#07080A"
                  showAccent={false}
                />
                <div
                  style={{
                    width: "1px",
                    height: "52px",
                    background: "rgba(7,8,10,0.25)",
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    fontFamily: BC,
                    fontWeight: 800,
                    fontSize: "40px",
                    letterSpacing: "0.06em",
                    color: "#07080A",
                  }}
                >
                  JAVELARK
                </div>
              </div>
            </Card>
          </div>

          {/* Mark isolated + Mono variants */}
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            <Card bg="#0E1013" label="Mark isolated">
              <div
                className="flex flex-col items-center"
                style={{ gap: "16px", padding: "40px" }}
              >
                <JavelarkMark size={80} />
                <Label>J/V COMPOSITE MARK</Label>
              </div>
            </Card>

            <Card bg="#0E1013" label="Mono · No accent">
              <div
                className="flex items-center"
                style={{ gap: "16px", padding: "32px 40px" }}
              >
                <JavelarkMark size={52} showAccent={false} />
                <div
                  style={{
                    fontFamily: BC,
                    fontWeight: 800,
                    fontSize: "32px",
                    letterSpacing: "0.06em",
                    color: "#EEEEE9",
                  }}
                >
                  JAVELARK
                </div>
              </div>
            </Card>

            <Card bg="#000000" label="Black / Print">
              <div
                className="flex items-center"
                style={{ gap: "16px", padding: "32px 40px" }}
              >
                <JavelarkMark
                  size={52}
                  fill="#ffffff"
                  accentFill="#ffffff"
                  showAccent={false}
                />
                <div
                  style={{
                    fontFamily: BC,
                    fontWeight: 800,
                    fontSize: "32px",
                    letterSpacing: "0.06em",
                    color: "#ffffff",
                  }}
                >
                  JAVELARK
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            DIRECTION 03 — APEX: STACKED BADGE
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: "100px" }}>
          <SectionHeader
            index="Direction 03"
            title="APEX — Stacked Badge"
            sub="Compact lockup for square and near-square formats: app icons, favicons, social profiles, embossed press marks. The chamfered container — one corner cut at 24° — embeds the angular language into the frame itself."
          />

          <div
            className="grid gap-4 mb-4"
            style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            {/* Primary badge on dark */}
            <Card bg="#07080A" label="Primary badge" style={{ minHeight: "280px" }}>
              <div style={{ padding: "40px" }}>
                <Badge>
                  <JavelarkMark size={72} />
                  <div
                    style={{
                      fontFamily: BC,
                      fontWeight: 800,
                      fontSize: "22px",
                      letterSpacing: "0.16em",
                      color: "#EEEEE9",
                    }}
                  >
                    JAVELARK
                  </div>
                </Badge>
              </div>
            </Card>

            {/* Reversed badge */}
            <Card bg="#EEEEE9" label="Reversed badge" style={{ minHeight: "280px" }}>
              <div style={{ padding: "40px" }}>
                <Badge bg="#EEEEE9" border="1.5px solid #07080A">
                  <JavelarkMark
                    size={64}
                    fill="#07080A"
                    accentFill="#07080A"
                    showAccent={false}
                  />
                  <div
                    style={{
                      fontFamily: BC,
                      fontWeight: 800,
                      fontSize: "20px",
                      letterSpacing: "0.16em",
                      color: "#07080A",
                    }}
                  >
                    JAVELARK
                  </div>
                </Badge>
              </div>
            </Card>

            {/* Volt badge */}
            <Card bg="#07080A" label="Volt badge" style={{ minHeight: "280px" }}>
              <div style={{ padding: "40px" }}>
                <Badge bg="#BBFF33" border="none">
                  <JavelarkMark
                    size={64}
                    fill="#07080A"
                    accentFill="#07080A"
                    showAccent={false}
                  />
                  <div
                    style={{
                      fontFamily: BC,
                      fontWeight: 800,
                      fontSize: "20px",
                      letterSpacing: "0.16em",
                      color: "#07080A",
                    }}
                  >
                    JAVELARK
                  </div>
                </Badge>
              </div>
            </Card>
          </div>

          {/* Favicon scale study */}
          <Card
            bg="#0E1013"
            label="Scale study — icon system"
            style={{ minHeight: "160px", alignItems: "flex-start" }}
          >
            <div style={{ padding: "32px 40px", width: "100%" }}>
              <div className="mb-5">
                <Label>Favicon Scale · All renderable sizes</Label>
              </div>
              <div
                className="flex items-end flex-wrap"
                style={{ gap: "32px" }}
              >
                {[512, 256, 128, 64, 48, 32, 20, 16].map((s) => (
                  <div
                    key={s}
                    className="flex flex-col items-center"
                    style={{ gap: "10px" }}
                  >
                    <div
                      style={{
                        width: `${Math.min(s, 96)}px`,
                        height: `${Math.min(s, 96)}px`,
                        background: "#07080A",
                        border: "1px solid #1A1D24",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <JavelarkMark
                        size={Math.min(s, 96) * 0.72}
                        showAccent={s >= 48}
                      />
                    </div>
                    <Label>{s}px</Label>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            MARK ANATOMY
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: "100px" }}>
          <SectionHeader
            index="Mark System"
            title="MARK ANATOMY"
          />

          <div
            className="relative overflow-hidden"
            style={{
              background: "#0E1013",
              border: "1px solid #1A1D24",
              padding: "56px 56px 48px",
            }}
          >
            {/* Background 24° stripe pattern */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(66deg,rgba(187,255,51,0.03) 0px,rgba(187,255,51,0.03) 1px,transparent 1px,transparent 48px)",
              }}
            />

            <div className="relative flex gap-16 flex-wrap">
              {/* Large annotated mark */}
              <div className="relative flex-shrink-0">
                <svg
                  width={222}
                  height={300}
                  viewBox="0 0 74 100"
                  fill="none"
                >
                  {/* Construction grid */}
                  <line
                    x1="0" y1="68" x2="74" y2="68"
                    stroke="#BBFF33" strokeWidth="0.25" strokeDasharray="2 2" opacity="0.4"
                  />
                  <line
                    x1="42" y1="0" x2="42" y2="100"
                    stroke="#BBFF33" strokeWidth="0.25" strokeDasharray="2 2" opacity="0.4"
                  />
                  {/* 24° arc indicator */}
                  <path
                    d="M 48 68 A 6 6 0 0 1 54 71"
                    stroke="#BBFF33"
                    strokeWidth="0.5"
                    fill="none"
                    opacity="0.7"
                  />
                  {/* Mark body */}
                  <polygon
                    points="8,0 42,0 42,68 66,79 66,100 8,100"
                    fill="#EEEEE9"
                  />
                  {/* Accent V-within-J */}
                  <polygon
                    points="42,68 66,79 66,100 50,100"
                    fill="#BBFF33"
                  />
                  {/* Annotation dots */}
                  <circle cx="8" cy="0" r="0.8" fill="#BBFF33" opacity="0.5" />
                  <circle cx="42" cy="0" r="0.8" fill="#BBFF33" opacity="0.5" />
                  <circle cx="42" cy="68" r="1.2" fill="#BBFF33" />
                  <circle cx="66" cy="79" r="1.2" fill="#BBFF33" />
                  <circle cx="66" cy="100" r="0.8" fill="#BBFF33" opacity="0.5" />
                  <circle cx="8" cy="100" r="0.8" fill="#BBFF33" opacity="0.5" />
                </svg>
              </div>

              {/* Anatomy notes */}
              <div className="flex-1" style={{ minWidth: "280px" }}>
                <div className="flex flex-col" style={{ gap: "28px" }}>
                  {[
                    {
                      n: "①",
                      name: "J STEM",
                      desc: "Primary vertical form. Bold rectangle spanning full cap height. 57% of total mark width. Square terminals — no rounds. Anchors stability in all lockups.",
                    },
                    {
                      n: "②",
                      name: "24° JUNCTION",
                      desc: "The angular chamfer connecting stem to hook at 24.6° from horizontal. All brand angles derive from this single measurement. When used at sub-32px, this chamfer defines the minimum recognisable form.",
                    },
                    {
                      n: "③",
                      name: "HOOK + V ACCENT",
                      desc: "Forward-facing hook (right, not left — breaking the typographic convention deliberately). The VOLT triangle fills the junction zone, encoding V within the J. In single-colour use, remove the accent and the J stands complete.",
                    },
                  ].map((item) => (
                    <div key={item.n} className="flex" style={{ gap: "16px" }}>
                      <div
                        style={{
                          fontFamily: BC,
                          fontWeight: 800,
                          fontSize: "24px",
                          color: "#BBFF33",
                          width: "28px",
                          flexShrink: 0,
                          paddingTop: "2px",
                        }}
                      >
                        {item.n}
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: JB,
                            fontSize: "10px",
                            letterSpacing: "0.16em",
                            color: "#EEEEE9",
                            marginBottom: "6px",
                          }}
                        >
                          {item.name}
                        </div>
                        <p
                          style={{
                            fontFamily: OT,
                            fontSize: "14px",
                            color: "#6B7280",
                            lineHeight: "1.65",
                            fontWeight: 300,
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div
                    style={{
                      marginTop: "8px",
                      padding: "16px 20px",
                      background: "rgba(187,255,51,0.05)",
                      border: "1px solid rgba(187,255,51,0.15)",
                      clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: JB,
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        color: "#BBFF33",
                        marginBottom: "6px",
                      }}
                    >
                      CONSTRUCTION · 24° LANGUAGE
                    </div>
                    <p
                      style={{
                        fontFamily: JB,
                        fontSize: "10px",
                        color: "#6B7280",
                        lineHeight: "1.7",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Point (42,68) → (66,79)<br />
                      Δx = 24 · Δy = 11<br />
                      atan(11/24) = 24.6° ✓
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            COLOR SYSTEM
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: "100px" }}>
          <SectionHeader index="Brand Colors" title="COLOR SYSTEM" />

          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
          >
            {[
              { name: "VOID", hex: "#07080A", rgb: "7 · 8 · 10", role: "Page ground" },
              { name: "SURFACE", hex: "#0E1013", rgb: "14 · 16 · 19", role: "Cards / panels" },
              { name: "GRAPHITE", hex: "#1A1D24", rgb: "26 · 29 · 36", role: "Borders · rules" },
              { name: "SLATE", hex: "#6B7280", rgb: "107 · 114 · 128", role: "Body · secondary" },
              { name: "CHALK", hex: "#EEEEE9", rgb: "238 · 238 · 233", role: "Primary text" },
              { name: "VOLT", hex: "#BBFF33", rgb: "187 · 255 · 51", role: "Accent · mark" },
            ].map((c) => (
              <div key={c.hex}>
                <div
                  style={{
                    height: "128px",
                    background: c.hex,
                    border: c.hex === "#07080A" ? "1px solid #1A1D24" : "none",
                    clipPath:
                      "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,0 100%)",
                    marginBottom: "14px",
                  }}
                />
                <div
                  style={{
                    fontFamily: BC,
                    fontWeight: 700,
                    fontSize: "13px",
                    letterSpacing: "0.14em",
                    color: "#EEEEE9",
                    marginBottom: "4px",
                  }}
                >
                  {c.name}
                </div>
                <div
                  style={{
                    fontFamily: JB,
                    fontSize: "10px",
                    color: "#BBFF33",
                    marginBottom: "3px",
                  }}
                >
                  {c.hex}
                </div>
                <div
                  style={{
                    fontFamily: JB,
                    fontSize: "9px",
                    color: "#3D4150",
                    marginBottom: "4px",
                  }}
                >
                  RGB {c.rgb}
                </div>
                <div
                  style={{
                    fontFamily: OT,
                    fontSize: "11px",
                    color: "#4B5260",
                    fontWeight: 300,
                  }}
                >
                  {c.role}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            TYPOGRAPHY
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: "100px" }}>
          <SectionHeader index="Type System" title="TYPOGRAPHY" />

          <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {/* Display specimen */}
            <div
              style={{
                background: "#0E1013",
                border: "1px solid #1A1D24",
                padding: "40px",
              }}
            >
              <Label>Display — Barlow Condensed 800</Label>
              <div
                style={{
                  fontFamily: BC,
                  fontWeight: 800,
                  fontSize: "clamp(48px,6vw,72px)",
                  color: "#EEEEE9",
                  lineHeight: 0.9,
                  letterSpacing: "-0.01em",
                  marginTop: "20px",
                }}
              >
                Bold.<br />Precise.<br />Progressive.
              </div>
            </div>

            {/* Body specimen */}
            <div
              style={{
                background: "#0E1013",
                border: "1px solid #1A1D24",
                padding: "40px",
              }}
            >
              <Label>Body — Outfit 300/400</Label>
              <p
                style={{
                  fontFamily: OT,
                  fontSize: "17px",
                  color: "#EEEEE9",
                  lineHeight: 1.65,
                  fontWeight: 400,
                  marginTop: "20px",
                }}
              >
                JAVELARK builds at the intersection of intelligence and precision. Every product, platform, and experience carries the same obsessive attention to form and function.
              </p>
              <p
                style={{
                  fontFamily: OT,
                  fontSize: "14px",
                  color: "#6B7280",
                  lineHeight: 1.7,
                  fontWeight: 300,
                  marginTop: "16px",
                }}
              >
                Secondary text at 14px / Outfit 300 / SLATE. Legible at sustained reading while maintaining clear hierarchy against primary body weight.
              </p>
            </div>

            {/* Full type scale */}
            <div
              style={{
                background: "#0E1013",
                border: "1px solid #1A1D24",
                padding: "40px",
                gridColumn: "span 2",
              }}
            >
              <Label>Complete Type Scale</Label>
              <div
                className="flex flex-col"
                style={{ gap: "0", marginTop: "24px" }}
              >
                {[
                  {
                    label: "D1 · 120px · 800",
                    text: "JAVELARK",
                    font: BC,
                    size: "clamp(48px,8vw,96px)",
                    weight: 800,
                    track: "-0.02em",
                    color: "#EEEEE9",
                  },
                  {
                    label: "D2 · 64px · 800",
                    text: "Digital Intelligence",
                    font: BC,
                    size: "clamp(32px,5vw,56px)",
                    weight: 800,
                    track: "-0.01em",
                    color: "#EEEEE9",
                  },
                  {
                    label: "H1 · 40px · 700",
                    text: "Precision at every layer",
                    font: BC,
                    size: "clamp(24px,4vw,38px)",
                    weight: 700,
                    track: "0em",
                    color: "#EEEEE9",
                  },
                  {
                    label: "BODY · 17px · 400",
                    text: "Technology that moves with intentional force.",
                    font: OT,
                    size: "17px",
                    weight: 400,
                    track: "0em",
                    color: "#EEEEE9",
                  },
                  {
                    label: "SMALL · 14px · 300",
                    text: "Supporting text and metadata at reduced hierarchy.",
                    font: OT,
                    size: "14px",
                    weight: 300,
                    track: "0em",
                    color: "#6B7280",
                  },
                  {
                    label: "MONO · 11px · 400",
                    text: "VERSION_2.0 · BUILD_STABLE · 24DEG_SYSTEM · MARK_V1",
                    font: JB,
                    size: "11px",
                    weight: 400,
                    track: "0.12em",
                    color: "#6B7280",
                  },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="flex items-baseline gap-6"
                    style={{
                      padding: "16px 0",
                      borderBottom: "1px solid #141619",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: JB,
                        fontSize: "9px",
                        color: "#3D4150",
                        width: "140px",
                        flexShrink: 0,
                        letterSpacing: "0.08em",
                        paddingTop: "4px",
                      }}
                    >
                      {t.label}
                    </span>
                    <span
                      style={{
                        fontFamily: t.font,
                        fontSize: t.size,
                        fontWeight: t.weight,
                        letterSpacing: t.track,
                        color: t.color,
                        lineHeight: 1.1,
                      }}
                    >
                      {t.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            USAGE SCENARIOS (INTERACTIVE)
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: "100px" }}>
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <SectionHeader index="Applications" title="USAGE SCENARIOS" />
            <div className="flex" style={{ gap: "4px", marginBottom: "8px" }}>
              {(["dark", "light", "color"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setUsageTheme(t)}
                  style={{
                    fontFamily: JB,
                    fontSize: "9px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    padding: "8px 16px",
                    background: usageTheme === t ? "#BBFF33" : "#0E1013",
                    color: usageTheme === t ? "#07080A" : "#6B7280",
                    border: `1px solid ${usageTheme === t ? "#BBFF33" : "#1A1D24"}`,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            {/* Scenario 1: Website header */}
            <Card
              bg={
                usageTheme === "dark"
                  ? "#07080A"
                  : usageTheme === "light"
                  ? "#EEEEE9"
                  : "#BBFF33"
              }
              label="Website header"
              style={{ minHeight: "180px", alignItems: "flex-start" }}
            >
              <div
                className="flex items-center justify-between"
                style={{
                  padding: "20px 24px",
                  borderBottom: `1px solid ${
                    usageTheme === "dark" ? "#1A1D24" : "rgba(0,0,0,0.12)"
                  }`,
                  width: "100%",
                }}
              >
                <div className="flex items-center" style={{ gap: "10px" }}>
                  <JavelarkMark
                    size={24}
                    fill={usageTheme === "dark" ? "#EEEEE9" : "#07080A"}
                    accentFill={usageTheme === "dark" ? "#BBFF33" : "#07080A"}
                    showAccent={usageTheme !== "color"}
                  />
                  <span
                    style={{
                      fontFamily: BC,
                      fontWeight: 800,
                      fontSize: "13px",
                      letterSpacing: "0.2em",
                      color: usageTheme === "dark" ? "#EEEEE9" : "#07080A",
                    }}
                  >
                    JAVELARK
                  </span>
                </div>
                <div className="flex" style={{ gap: "20px" }}>
                  {["Work", "About", "Contact"].map((n) => (
                    <span
                      key={n}
                      style={{
                        fontFamily: OT,
                        fontSize: "12px",
                        color:
                          usageTheme === "dark"
                            ? "#6B7280"
                            : "rgba(7,8,10,0.6)",
                        fontWeight: 400,
                      }}
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            {/* Scenario 2: Email footer */}
            <Card
              bg={
                usageTheme === "dark"
                  ? "#0E1013"
                  : usageTheme === "light"
                  ? "#F5F5F0"
                  : "#A8E62E"
              }
              label="Email footer"
              style={{ minHeight: "180px" }}
            >
              <div
                className="flex flex-col items-center"
                style={{ gap: "10px", padding: "32px" }}
              >
                <JavelarkMark
                  size={40}
                  fill={usageTheme === "dark" ? "#EEEEE9" : "#07080A"}
                  accentFill={usageTheme === "dark" ? "#BBFF33" : "#07080A"}
                  showAccent={usageTheme !== "color"}
                />
                <span
                  style={{
                    fontFamily: BC,
                    fontWeight: 800,
                    fontSize: "14px",
                    letterSpacing: "0.2em",
                    color: usageTheme === "dark" ? "#EEEEE9" : "#07080A",
                  }}
                >
                  JAVELARK
                </span>
                <span
                  style={{
                    fontFamily: OT,
                    fontSize: "11px",
                    color:
                      usageTheme === "dark" ? "#3D4150" : "rgba(7,8,10,0.4)",
                  }}
                >
                  hello@javelark.com
                </span>
              </div>
            </Card>

            {/* Scenario 3: Card / press mark */}
            <Card
              bg={
                usageTheme === "dark"
                  ? "#1A1D24"
                  : usageTheme === "light"
                  ? "#EEEEE9"
                  : "#BBFF33"
              }
              label="Press mark / card"
              style={{ minHeight: "180px" }}
            >
              <div style={{ padding: "32px" }}>
                <Badge
                  bg={
                    usageTheme === "dark"
                      ? "#0E1013"
                      : usageTheme === "light"
                      ? "#07080A"
                      : "#07080A"
                  }
                  border={
                    usageTheme === "dark" ? "1px solid #2A2D35" : "none"
                  }
                >
                  <JavelarkMark
                    size={44}
                    fill={
                      usageTheme === "dark" ? "#EEEEE9" : "#EEEEE9"
                    }
                    accentFill="#BBFF33"
                    showAccent={true}
                  />
                  <span
                    style={{
                      fontFamily: BC,
                      fontWeight: 800,
                      fontSize: "14px",
                      letterSpacing: "0.18em",
                      color: "#EEEEE9",
                    }}
                  >
                    JAVELARK
                  </span>
                </Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            CLEAR SPACE + RULES
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: "80px" }}>
          <SectionHeader index="Usage Rules" title="CLEAR SPACE + DO / DON'T" />

          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            {/* Clear space demo */}
            <div
              style={{
                background: "#0E1013",
                border: "1px solid #1A1D24",
                padding: "40px",
              }}
            >
              <Label>Minimum Clear Space · 1× mark width</Label>
              <div
                className="flex items-center justify-center"
                style={{ marginTop: "32px", position: "relative" }}
              >
                <div
                  style={{
                    position: "relative",
                    border: "1px dashed rgba(187,255,51,0.2)",
                    padding: "32px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-1px",
                      left: "-1px",
                      right: "-1px",
                      bottom: "-1px",
                      pointerEvents: "none",
                    }}
                  >
                    {/* Corner ticks */}
                    {[
                      { top: 0, left: 0 },
                      { top: 0, right: 0 },
                      { bottom: 0, left: 0 },
                      { bottom: 0, right: 0 },
                    ].map((pos, i) => (
                      <div
                        key={i}
                        style={{
                          position: "absolute",
                          width: "8px",
                          height: "8px",
                          borderTop: i < 2 ? "1px solid #BBFF33" : "none",
                          borderBottom: i >= 2 ? "1px solid #BBFF33" : "none",
                          borderLeft:
                            i === 0 || i === 2 ? "1px solid #BBFF33" : "none",
                          borderRight:
                            i === 1 || i === 3 ? "1px solid #BBFF33" : "none",
                          opacity: 0.5,
                          ...pos,
                        }}
                      />
                    ))}
                  </div>
                  <JavelarkMark size={56} />
                </div>
              </div>
              <p
                style={{
                  fontFamily: OT,
                  fontSize: "13px",
                  color: "#6B7280",
                  lineHeight: 1.6,
                  marginTop: "20px",
                  fontWeight: 300,
                }}
              >
                Maintain a clear zone equal to the mark's width on all sides. Never crowd the mark with competing elements within this boundary.
              </p>
            </div>

            {/* Dos and donts */}
            <div
              style={{
                background: "#0E1013",
                border: "1px solid #1A1D24",
                padding: "40px",
              }}
            >
              <Label>Brand Rules</Label>
              <div className="flex flex-col" style={{ gap: "16px", marginTop: "24px" }}>
                {[
                  { ok: true, rule: "Use mark + wordmark in the approved lockups only" },
                  { ok: true, rule: "Maintain 24° chamfer in all derived angular elements" },
                  { ok: true, rule: "Use VOLT accent on dark or black grounds exclusively" },
                  { ok: true, rule: "Single-colour lockup (CHALK or black) for embossing and engraving" },
                  { ok: false, rule: "Do not rotate, skew, or distort the mark" },
                  { ok: false, rule: "Do not add drop shadows, glows, or gradients to the mark" },
                  { ok: false, rule: "Do not use VOLT accent on light or white grounds" },
                  { ok: false, rule: "Do not reproduce the mark below 16px" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start" style={{ gap: "10px" }}>
                    <span
                      style={{
                        fontFamily: BC,
                        fontWeight: 800,
                        fontSize: "14px",
                        color: item.ok ? "#BBFF33" : "#FF4444",
                        flexShrink: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.ok ? "✓" : "✗"}
                    </span>
                    <span
                      style={{
                        fontFamily: OT,
                        fontSize: "13px",
                        color: item.ok ? "#EEEEE9" : "#6B7280",
                        fontWeight: item.ok ? 400 : 300,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.rule}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between flex-wrap"
          style={{
            borderTop: "1px solid #141619",
            paddingTop: "32px",
            gap: "16px",
          }}
        >
          <div className="flex items-center" style={{ gap: "12px" }}>
            <JavelarkMark size={20} />
            <span
              style={{
                fontFamily: JB,
                fontSize: "9px",
                color: "#3D4150",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              JAVELARK BRAND IDENTITY SYSTEM · V1.0 · 2026
            </span>
          </div>
          <span
            style={{
              fontFamily: JB,
              fontSize: "9px",
              color: "#2A2D35",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            24° ANGULAR LANGUAGE · THREE DIRECTIONS
          </span>
        </div>
      </main>
    </div>
  );
}
