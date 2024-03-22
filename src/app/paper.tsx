// import { promises as fs } from "fs"
// import path from "path"
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { UserNav } from "./components/user-nav";
import { paperSchema } from "./papers/schema";
import data from "./papers/papers.json";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
function getPapers() {
  const papers = data;
  return z.array(paperSchema).parse(papers);
}

export default function TaskPage() {
  const papers = getPapers();

  return (
    <>
      {/* <div className="sm:hidden">
        <Image
          src="/images/annotated-papers.png"
          width={1280}
          height={998}
          alt="A screenshot of the paper browser."
          className="block"
        />
      </div> */}
      <div className="h-full flex-1 flex-col space-y-8 p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Annotated Papers
            </h2>
            <p className="text-muted-foreground md:hidden">
              Best used with a larger screen.
            </p>
            {/* <p className="text-muted-foreground">
              Here&apos;s the list of papers we&apos;ve surveyed by far.
            </p> */}
          </div>
        </div>
        <DataTable data={papers} columns={columns} />
      </div>
    </>
  );
}
