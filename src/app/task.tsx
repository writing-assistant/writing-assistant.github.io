// import { promises as fs } from "fs"
// import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"
import { taskSchema } from "./data/schema"
import data from "./data/tasks.json"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

// Simulate a database read for tasks.
function getTasks() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), "src/app/data/tasks.json")
//   )

  const tasks = data;

  return z.array(taskSchema).parse(tasks)
}

export default function TaskPage() {
  const tasks = getTasks()

  return (
    <>
      <div className="sm:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Papers Reviewed</h2>
            <p className="text-muted-foreground">
              Here&apos;s the list of papers we&apos;ve surveyed by far. 
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
