"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import React, { RefObject, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./components/page-header";

import TaskPage from "./paper";

const TITLE = "A Design Space for Intelligent and Interactive Writing Assistants";


const PAPER_URL = "https://arxiv.org/abs/2311.09188";
const BASE_PATH = "";

interface Author {
  name: string;
  role: string;
  affiliation: string;
  email?: string;
  website?: string;
  avatar?: string;
}

const AUTHORS:Author[] = [
  {"name": "Mina Lee", "role": "Project leads", "affiliation": "University of Chicago & Microsoft Research"},
  {"name": "Katy Ilonka Gero", "role": "Project leads", "affiliation": "Harvard University"},
  {"name": "John Joon Young Chung", "role": "Project leads", "affiliation": "Midjourney"},
  {"name": "Simon Buckingham Shum", "role": "Team leads", "affiliation": "University of Technology Sydney"},
  {"name": "Vipul Raheja", "role": "Team leads", "affiliation": "Grammarly"},
  {"name": "Hua Shen", "role": "Team leads", "affiliation": "University of Michigan"},
  {"name": "Subhashini Venugopalan", "role": "Team leads", "affiliation": "Google"},
  {"name": "Thiemo Wambsganss", "role": "Team leads", "affiliation": "Bern University of Applied Sciences"},
  {"name": "David Zhou", "role": "Team leads", "affiliation": "University of Illinois, Urbana-Champaign"},
  {"name": "Emad A. Alghamdi", "role": "Team members", "affiliation": "King Abdulaziz University"},
  {"name": "Tal August", "role": "Team members", "affiliation": "Allen Institute for AI"},
  {"name": "Avinash Bhat", "role": "Team members", "affiliation": "McGill University"},
  {"name": "Madiha Zahrah Choksi", "role": "Team members", "affiliation": "Cornell Tech"},
  {"name": "Senjuti Dutta", "role": "Team members", "affiliation": "University of Tennessee, Knoxville"},
  {"name": "Jin L.C. Guo", "role": "Team members", "affiliation": "McGill University"},
  {"name": "Md Naimul Hoque", "role": "Team members", "affiliation": "University of Maryland, College Park"},
  {"name": "Yewon Kim", "role": "Team members", "affiliation": "KAIST"},
  {"name": "Simon Knight", "role": "Team members", "affiliation": "University of Technology Sydney"},
  {"name": "Seyed Parsa Neshaei", "role": "Team members", "affiliation": "EPFL"},
  {"name": "Agnia Sergeyuk", "role": "Team members", "affiliation": "JetBrains Research"},
  {"name": "Antonette Shibani", "role": "Team members", "affiliation": "University of Technology Sydney"},
  {"name": "Disha Shrivastava", "role": "Team members", "affiliation": "Google DeepMind"},
  {"name": "Lila Shroff", "role": "Team members", "affiliation": "Stanford University"},
  {"name": "Jessi Stark", "role": "Team members", "affiliation": "University of Toronto"},
  {"name": "Sarah Sterman", "role": "Team members", "affiliation": "University of Illinois, Urbana-Champaign"},
  {"name": "Sitong Wang", "role": "Team members", "affiliation": "Columbia University"},
  {"name": "Antoine Bosselut", "role": "Advisors", "affiliation": "EPFL"},
  {"name": "Daniel Buschek", "role": "Advisors", "affiliation": "University of Bayreuth"},
  {"name": "Joseph Chee Chang", "role": "Advisors", "affiliation": "Allen Institute for AI"},
  {"name": "Sherol Chen", "role": "Advisors", "affiliation": "Google"},
  {"name": "Max Kreminski", "role": "Advisors", "affiliation": "Midjourney"},
  {"name": "Joonsuk Park", "role": "Advisors", "affiliation": "University of Richmond"},
  {"name": "Roy Pea", "role": "Advisors", "affiliation": "Stanford University"},
  {"name": "Eugenia H. Rho", "role": "Advisors", "affiliation": "Virginia Tech"},
  {"name": "Shannon Zejiang Shen", "role": "Advisors", "affiliation": "Massachusetts Institute of Technology"},
  {"name": "Pao Siangliulue", "role": "Advisors", "affiliation": "B12"}
];

const AuthorHoverCard = (author: Author) => (
  <HoverCard openDelay={100} closeDelay={100}>
    <HoverCardTrigger className="pr-4" style={{ marginLeft: 0 }}>
      {/* <a href={author.website} target="_blank"> */}
      <Button className="px-0" variant="link">
        {author.name}
      </Button>
      {/* </a> */}
    </HoverCardTrigger>
    <HoverCardContent>
      <div className="flex justify-between">
        <Avatar className="mr-4">
          <AvatarImage src={author.avatar} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{author.name}</h4>
          <p className="text-sm">{author.affiliation}</p>
          <div className="flex items-center pt-2 overflow-wrap break-words">
            <strong>Email: </strong>{" "}
            <Link className="pl-0.5" href={`mailto:${author.email}`}>
              {author.email}
            </Link>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);


const AuthorHoverCard2 = (author: (typeof AUTHORS)[0]) => (
  <HoverCard openDelay={100} closeDelay={100}>
    <HoverCardTrigger className="">
      <Avatar className="mr-0.5 my-0.5">
          <AvatarImage src={author.avatar} />
          <AvatarFallback>{`${author.name.split(' ')[0][0]}${author.name.split(' ').pop()?.[0]}`}</AvatarFallback>
      </Avatar>
    </HoverCardTrigger>
    <HoverCardContent>
      <div className="flex justify-between">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{author.name}</h4>
          <p className="text-sm">{author.affiliation}</p>
          <div className="flex items-center pt-2 overflow-wrap break-words text-sm">
            <strong>Email: </strong>{" "}
            <Link className="pl-0.5" href={`mailto:${author?.email}`}>
              {author?.email}
            </Link>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);


const Headline = () => (
  <PageHeader className="page-header pb-12 pt-4">
    <PageHeaderHeading className="tracking-tight">{TITLE}</PageHeaderHeading>
    <Separator className="my-2" />
    <div className="flex flex-wrap justify-start items-start align-start space-x-0">
      {AUTHORS.map((author, index) => (
        <React.Fragment key={index}>{AuthorHoverCard2(author)}</React.Fragment>
      ))}
    </div>
  </PageHeader>
);

export default function Home() {
  return (
    <div className="container min-h-screen relative px-16 pt-8 pb-16">
      <Headline />
      <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
        <TaskPage />
      </div>
    </div>
  );
}
