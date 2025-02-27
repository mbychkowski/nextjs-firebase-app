/* eslint-disable @typescript-eslint/no-explicit-any */

import { LucideMessageSquareWarning } from "lucide-react"
import { cloneElement } from "react"

type PlaceholderComponentProps = {
  label: string,
  icon?: React.ReactElement<any>,
  button?: React.ReactElement<any>
}

export default function Placeholder ({
  label,
  icon = <LucideMessageSquareWarning />,
  button = <div />} : PlaceholderComponentProps) {

  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-4">
      {cloneElement(icon, {
        className: "w-16 h-16"
      })}
      <h2 className="text-lg text-center">
        {label}
      </h2>
      {cloneElement(button, {
        className: "h-10"
      })}
    </div>
  )
}