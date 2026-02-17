import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps {
  min?: number
  max?: number
  step?: number
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  disabled?: boolean
  className?: string
  "aria-label"?: string
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      value: controlledValue,
      defaultValue = [0],
      onValueChange,
      disabled = false,
      className,
      "aria-label": ariaLabel,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const value = controlledValue ?? internalValue
    const trackRef = React.useRef<HTMLDivElement>(null)

    const getPercentage = (val: number) =>
      ((val - min) / (max - min)) * 100

    const getValueFromPosition = (clientX: number) => {
      if (!trackRef.current) return value[0]
      const rect = trackRef.current.getBoundingClientRect()
      const percent = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width)
      )
      const rawValue = min + percent * (max - min)
      const stepped = Math.round(rawValue / step) * step
      return Math.max(min, Math.min(max, stepped))
    }

    const handlePointerDown = (
      e: React.PointerEvent,
      thumbIndex: number
    ) => {
      if (disabled) return
      e.preventDefault()
      const target = e.currentTarget as HTMLElement
      target.setPointerCapture(e.pointerId)

      const handleMove = (moveEvent: PointerEvent) => {
        const newVal = getValueFromPosition(moveEvent.clientX)
        const newValues = [...value]
        newValues[thumbIndex] = newVal

        // For range sliders, ensure min <= max
        if (newValues.length === 2) {
          if (thumbIndex === 0 && newVal > newValues[1]) return
          if (thumbIndex === 1 && newVal < newValues[0]) return
        }

        setInternalValue(newValues)
        onValueChange?.(newValues)
      }

      const handleUp = () => {
        target.removeEventListener("pointermove", handleMove)
        target.removeEventListener("pointerup", handleUp)
      }

      target.addEventListener("pointermove", handleMove)
      target.addEventListener("pointerup", handleUp)
    }

    const handleTrackClick = (e: React.MouseEvent) => {
      if (disabled) return
      const newVal = getValueFromPosition(e.clientX)

      if (value.length === 2) {
        // Move the closest thumb
        const distToFirst = Math.abs(newVal - value[0])
        const distToSecond = Math.abs(newVal - value[1])
        const idx = distToFirst <= distToSecond ? 0 : 1
        const newValues = [...value]
        newValues[idx] = newVal
        setInternalValue(newValues)
        onValueChange?.(newValues)
      } else {
        const newValues = [newVal]
        setInternalValue(newValues)
        onValueChange?.(newValues)
      }
    }

    const fillLeft =
      value.length === 2 ? getPercentage(value[0]) : 0
    const fillRight =
      value.length === 2
        ? getPercentage(value[1])
        : getPercentage(value[0])

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center py-2",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <div
          ref={trackRef}
          className="relative h-2 w-full cursor-pointer rounded-full bg-[#1a3a5c]"
          onClick={handleTrackClick}
        >
          {/* Filled range */}
          <div
            className="absolute h-full rounded-full bg-[#C9A227]"
            style={{
              left: `${fillLeft}%`,
              width: `${fillRight - fillLeft}%`,
            }}
          />
        </div>

        {/* Thumbs */}
        {value.map((val, index) => (
          <div
            key={index}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={val}
            aria-label={
              ariaLabel
                ? value.length === 2
                  ? `${ariaLabel} ${index === 0 ? "minimum" : "maximum"}`
                  : ariaLabel
                : undefined
            }
            aria-disabled={disabled}
            className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-[#C9A227] bg-[#0f2847] shadow-md transition-colors hover:bg-[#C9A227]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]/50 active:cursor-grabbing"
            style={{
              left: `${getPercentage(val)}%`,
            }}
            onPointerDown={(e) => handlePointerDown(e, index)}
            onKeyDown={(e) => {
              if (disabled) return
              let newVal = val
              if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                e.preventDefault()
                newVal = Math.min(max, val + step)
              } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                e.preventDefault()
                newVal = Math.max(min, val - step)
              } else if (e.key === "Home") {
                e.preventDefault()
                newVal = min
              } else if (e.key === "End") {
                e.preventDefault()
                newVal = max
              }
              if (newVal !== val) {
                const newValues = [...value]
                newValues[index] = newVal
                setInternalValue(newValues)
                onValueChange?.(newValues)
              }
            }}
          />
        ))}
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
