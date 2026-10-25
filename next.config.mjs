/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production sets this off. Without it, `next dev` writes AGENTS.md / CLAUDE.md helper files
  // into the repository root; this task copy should contain only the app.
  agentRules: false,
  // The page uses plain <img> elements rather than next/image, exactly as production does,
  // so the image optimizer is off.
  images: { unoptimized: true },
}

export default nextConfig
