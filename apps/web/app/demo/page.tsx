"use client"
import React from 'react'
import DraggableCanvas, { DraggableCanvasItem } from '@/app/../r/new-york/draggable-canvas/draggable-canvas'

const items: DraggableCanvasItem[] = [
  { src: '/image/1.jpg', top: '20%', left: '35%' },
  { src: '/image/2.jpg', top: '40%', left: '45%' },
  { src: '/image/3.jpg', top: '30%', left: '63%' }
]

const DemoPage = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#1C1C1C]">
      <DraggableCanvas
        items={items}
        width="300vw"
        height="150vh"
        showBoundary
        showCornerLabels={false}
        initialCenter
      />
    </div>
  )
}

export default DemoPage