import { Separator } from "./ui/separator";

type HeadingProps ={
  title: string,
  description?: string
}

export default function Heading({title, description}: HeadingProps) {

  return (
    <>
      <div className="self-start flex flex-col px-8 gap-y-2 ">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {
          description &&
          <p className="text-sm text-muted-foreground">{description}</p>
        }
        <Separator className="self-start"/>
      </div>
    </>
  )
}
