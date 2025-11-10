"use client"

import { useState } from "react"
import Image from "next/image"
import { Github, Play, Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VideoModal } from "@/components/video-modal"

interface Creator {
  studentId: string
  name: string
}

interface Project {
  id: string
  title: string
  poster: string
  creators: Creator[]
  hasVideo: boolean
  hasGithub: boolean
  hasDownload: boolean
  videoUrl?: string
  githubUrl?: string
  downloadUrl?: string
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false)
  const [isCreatorsExpanded, setIsCreatorsExpanded] = useState(false)

  const maxVisibleCreators = 2
  const hasMoreCreators = project.creators.length > maxVisibleCreators
  const hiddenCreatorsCount = Math.max(0, project.creators.length - maxVisibleCreators)

  // Count total buttons
  const buttonCount = (project.hasVideo ? 1 : 0) + (project.hasDownload ? 1 : 0) + (project.hasGithub ? 1 : 0)

  // Determine responsive class based on button count
  // 3+ buttons: show text only on xl screens, 2 buttons: show on lg, 1 button: show on md
  const textVisibilityClass = buttonCount >= 3 ? 'hidden xl:inline' : buttonCount === 2 ? 'hidden lg:inline' : 'hidden md:inline'
  const buttonGapClass = buttonCount >= 3 ? 'gap-0 xl:gap-1.5' : buttonCount === 2 ? 'gap-0 lg:gap-1.5' : 'gap-0 md:gap-1.5'
  const buttonPaddingClass = buttonCount >= 3 ? 'px-2 xl:px-3' : buttonCount === 2 ? 'px-2 lg:px-3' : 'px-2 md:px-3'

  return (
    <>
      <div className="relative aspect-[3/4] rounded-lg bg-card border border-border shadow-md transition-shadow hover:shadow-xl overflow-hidden">

        {/* Poster Image */}
        <div
          className="group relative w-full h-full overflow-hidden"
        >
          <div
            className="absolute inset-0 cursor-pointer z-[5]"
            onClick={(e) => {
              console.log('Poster clicked!')
              setIsPosterModalOpen(true)
            }}
          />
          <Image
            src={project.poster || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* Info and Buttons Overlay (always visible) */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-black/60 p-3 pb-4"
          style={{
            paddingTop: '12px',
            paddingBottom: '16px'
          }}
        >
          <h3
            className="font-bold text-white mb-2 line-clamp-1 pointer-events-none"
            style={{
              fontSize: `clamp(1rem, ${Math.max(1, Math.min(1.75, 30 / Math.max(1, project.title.length)))}rem, 1.75rem)`
            }}
          >
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {/* Always visible creators */}
            {project.creators.slice(0, maxVisibleCreators).map((creator, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full text-xs font-medium text-black pointer-events-none"
              >
                <span className="font-semibold">{creator.studentId}</span>
                <span className="w-px h-3 bg-black/20" />
                <span>{creator.name}</span>
              </div>
            ))}

            {/* Additional creators when expanded */}
            {isCreatorsExpanded && project.creators.slice(maxVisibleCreators).map((creator, index) => (
              <div
                key={index + maxVisibleCreators}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full text-xs font-medium text-black pointer-events-none"
              >
                <span className="font-semibold">{creator.studentId}</span>
                <span className="w-px h-3 bg-black/20" />
                <span>{creator.name}</span>
              </div>
            ))}

            {/* Toggle button */}
            {hasMoreCreators && (
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full text-xs font-medium text-black cursor-pointer hover:bg-gray-100 transition-colors pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsCreatorsExpanded(!isCreatorsExpanded)
                }}
              >
                <span className="font-semibold">
                  {isCreatorsExpanded ? '접기' : `외 ${hiddenCreatorsCount}명...`}
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-1.5">
            {project.hasVideo && (
              <Button
                size="sm"
                variant="default"
                className={`${buttonGapClass} bg-white text-black hover:bg-gray-200 shadow-lg cursor-pointer transition-colors ${buttonPaddingClass} text-xs`}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsVideoModalOpen(true)
                }}
              >
                <Play className="w-3.5 h-3.5" />
                <span className={textVisibilityClass}>동영상</span>
              </Button>
            )}
            {project.hasDownload && (
              <Button
                size="sm"
                variant="secondary"
                className={`${buttonGapClass} bg-primary text-white hover:bg-primary/70 shadow-lg cursor-pointer transition-colors ${buttonPaddingClass} text-xs`}
                onClick={(e) => {
                  e.stopPropagation()
                  project.downloadUrl && window.open(project.downloadUrl, "_blank")
                }}
              >
                <Download className="w-3.5 h-3.5" />
                <span className={textVisibilityClass}>다운로드</span>
              </Button>
            )}
            {project.hasGithub && (
              <Button
                size="sm"
                variant="default"
                className={`${buttonGapClass} bg-black text-white hover:bg-gray-700 shadow-lg cursor-pointer transition-colors ${buttonPaddingClass} text-xs`}
                onClick={(e) => {
                  e.stopPropagation()
                  project.githubUrl && window.open(project.githubUrl, "_blank")
                }}
              >
                <Github className="w-3.5 h-3.5" />
                <span className={textVisibilityClass}>GitHub</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {project.videoUrl && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoUrl={project.videoUrl}
          title={project.title}
        />
      )}

      {/* Poster Modal */}
      {isPosterModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsPosterModalOpen(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white text-black hover:bg-gray-200 transition-colors z-10 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              setIsPosterModalOpen(false)
            }}
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative w-full h-full max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={project.poster || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1536px"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}
