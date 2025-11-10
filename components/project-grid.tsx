"use client"

import { ProjectCard } from "@/components/project-card"

interface ProjectGridProps {
  year: string
}

// Sample data - in a real app, this would be fetched from the data directory
const sampleProjects = [
  {
    id: "1",
    title: "던전 크로니클",
    poster: "/dark-fantasy-dungeon-game-poster.jpg",
    creators: [
      { studentId: "0000000", name: "이름" },
      { studentId: "0000000", name: "이름" },
    ],
    hasVideo: true,
    hasGithub: true,
    hasDownload: true,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubUrl: "https://github.com/example/dungeon-chronicle",
    downloadUrl: "https://example.com/downloads/dungeon-chronicle.zip",
  },
  {
    id: "2",
    title: "스페이스 오디세이",
    poster: "/space-exploration-game-poster.jpg",
    creators: [{ studentId: "0000000", name: "이름" }],
    hasVideo: true,
    hasGithub: true,
    hasDownload: false,
    videoUrl: "https://vimeo.com/148751763",
    githubUrl: "https://github.com/example/space-odyssey",
  },
  {
    id: "3",
    title: "타임 패러독스",
    poster: "/time-travel-puzzle-game-poster.jpg",
    creators: [
      { studentId: "0000000", name: "이름" },
      { studentId: "0000000", name: "이름" },
      { studentId: "0000000", name: "이름" },
    ],
    hasVideo: true,
    hasGithub: false,
    hasDownload: true,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    downloadUrl: "https://example.com/downloads/time-paradox.zip",
  },
  {
    id: "4",
    title: "네온 레이서",
    poster: "/neon-racing-game-poster.jpg",
    creators: [{ studentId: "0000000", name: "이름" }],
    hasVideo: false,
    hasGithub: true,
    hasDownload: true,
    githubUrl: "https://github.com/example/neon-racer",
    downloadUrl: "https://example.com/downloads/neon-racer.zip",
  },
  {
    id: "5",
    title: "미스틱 가든",
    poster: "/magical-garden-game-poster.jpg",
    creators: [
      { studentId: "0000000", name: "이름" },
      { studentId: "0000000", name: "이름" },
    ],
    hasVideo: true,
    hasGithub: true,
    hasDownload: true,
    videoUrl: "https://vimeo.com/148751763",
    githubUrl: "https://github.com/example/mystic-garden",
    downloadUrl: "https://example.com/downloads/mystic-garden.zip",
  },
  {
    id: "6",
    title: "사이버 디펜스",
    poster: "/cyberpunk-tower-defense-game-poster.jpg",
    creators: [{ studentId: "0000000", name: "이름" }],
    hasVideo: true,
    hasGithub: true,
    hasDownload: false,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubUrl: "https://github.com/example/cyber-defense",
  },
  {
    id: "7",
    title: "로스트 아일랜드",
    poster: "/survival-island-game-poster.jpg",
    creators: [
      { studentId: "0000000", name: "이름" },
      { studentId: "0000000", name: "이름" },
    ],
    hasVideo: true,
    hasGithub: false,
    hasDownload: true,
    videoUrl: "https://vimeo.com/148751763",
    downloadUrl: "https://example.com/downloads/lost-island.zip",
  },
  {
    id: "8",
    title: "드래곤 레전드",
    poster: "/dragon-fantasy-rpg-game-poster.jpg",
    creators: [{ studentId: "0000000", name: "이름" }],
    hasVideo: true,
    hasGithub: true,
    hasDownload: true,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubUrl: "https://github.com/example/dragon-legend",
    downloadUrl: "https://example.com/downloads/dragon-legend.zip",
  },
]

export function ProjectGrid({ year }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {sampleProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
