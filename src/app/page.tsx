"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import React, { RefObject, useEffect, useRef, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { GitHubLogoIcon, EnvelopeClosedIcon, RocketIcon, ReaderIcon, ClipboardIcon } from '@radix-ui/react-icons'
import { cn } from "@/lib/utils";
import Image from "next/image";

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
import next from "next";

const TITLE = "A Design Space for Intelligent and Interactive Writing Assistants";


const FORM_URL = "https://forms.gle/iyk5DiECGDdc9vSQA";
const PAPER_URL = "http://arxiv.org/abs/2403.14117";
const GITHUB_URL = "https://github.com/writing-assistant/writing-assistant.github.io";
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
      <Button className="px-0" variant="link">
        {author.name}
      </Button>
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
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);


const Headline = () => (
  <PageHeader className="page-header pb-12 pt-4">
    <PageHeaderHeading className="tracking-tight">{TITLE} </PageHeaderHeading>
    <Separator className="my-2" />
    <section className="flex w-full items-center space-x-4 pb-1 pt-4 md:pb-1">
      <Link
        href={PAPER_URL}
        target="_blank"
        className={cn(buttonVariants({ variant: "outline" }), "rounded-[6px]")}
      >
        <ReaderIcon className="ml-0 h-4 w-4" />
        <Separator className="mx-2 h-4" orientation="vertical" />{" "}
        <span>Paper</span>
      </Link>
      <Link
        href={GITHUB_URL}
        target="_blank"
        className={cn(buttonVariants({ variant: "outline" }), "rounded-[6px]")}
      >
        <GitHubLogoIcon className="ml-0 h-4 w-4" />
        <Separator className="mx-2 h-4" orientation="vertical" />{" "}
        <span>Code</span>
      </Link>
      <Link
        href="#annotated-papers"
        className={cn(buttonVariants({ variant: "outline" }), "rounded-[6px]")}
      >
        <RocketIcon className="ml-0 h-4 w-4" />
        <Separator className="mx-2 h-4" orientation="vertical" />{" "}
        <span>Interactive Demo</span>
      </Link>
      {/* <Link
        href="mailto:mnlee@uchicago.edu"
        className={cn(buttonVariants({ variant: "outline" }), "rounded-[6px]")}
      >
        <EnvelopeClosedIcon className="ml-0 h-4 w-4" />
        <Separator className="mx-2 h-4" orientation="vertical" />{" "}
        <span>Contact</span>
      </Link> */}
    </section>

    <div className="pt-4 font-sans">
      <p className="pb-4">Welcome to our design space for intelligent and interactive writing assistants! The design space consists of five aspects: <span className="dsiiwa-task-color font-bold">task</span>, <span className="dsiiwa-user-color font-bold">user</span>, <span className="dsiiwa-technology-color font-bold">technology</span>, <span className="dsiiwa-interaction-color font-bold">interaction</span>, and <span className="dsiiwa-ecosystem-color font-bold">ecosystem</span>. Within each aspect, we define dimensions (i.e., fundamental components of an aspect) and codes (i.e., potential options for each dimension). Please refer to <a href={PAPER_URL} target="_blank" className="dsiiwa-link">our paper</a> for the detailed definitions of each dimension and code.</p>
      
      <p className="pb-4">To create this design space, we collaborated with researchers from a variety of disciplines, including Human-Computer Interaction (HCI), Natural Language Processing (NLP), Information Systems, and Education, and annotated 115 papers from HCI and NLP fields to understand the current landscape of writing assistants. We hope that our design space offers researchers and designers a practical tool to navigate, comprehend, and compare the various possibilities of writing assistants, and aid in the envisioning and design of new writing assistants.</p>

      <p className="pb-4">Our design space is a <span className="font-bold">living artifact</span>, as it will evolve over time alongside the fields. We invite the community to contribute to this artifact by adding new papers, annotations, and discussions to track future developments in this space.</p>
    </div>
    
    <div className="dsiiwa-figure pt-8">
      <Image
          src="/images/design-space.png"
          width={1371}
          height={1046}
          alt="The figure shows the integrated design space for writing assistants. It is comprised of five boxes, Ecosystem, Task, User, Interaction, and Technology. \n Ecosystem is the biggest box that surrounds the rest, and has the following items: Digital infrastructure (e.g., usability consistency, technical interoperability), Social factors (e.g., designing with stakeholders, desigining for social writing), Locale (e.g., local writing, remote writing), Access model (e.g., free and/or open-source software, commercial software), Norms and Rules (e.g., laws, conventions), and Change over time (e.g., authors, readers, writing, information environment). \n The top part inside Ecosystem box is occupied by Task box, which overlaps with User, Interaction, and Technology boxes. Task box has the following items: Writing stage (e.g., planning, drafting, revision), Writing context (e.g., academic, journalistic, technical), Purpose (e.g., expository, narrative, descriptive), Specificity (e.g., general direction, detailed requirements), and Audience (e.g., specified, implied).\n Interaction box is positioned in the middle of the User and Technology boxes, with arrows connecting to and from these boxes. Interaction has the following points: User - Steering the system (e.g., explicit, implicit, no control), User - Integrating system output (e.g., selection,  inspiration), UI - Interface paradigm (e.g., text editor, chatbot),  UI - Layout (e.g., writing area, separated, input UI), UI - Visual differentiation (e.g., formatting, location), UI - Interaction metaphor (e.g., agent, tool, hybrid), UI - Initiation (e.g., user-initiated, system-initiated), Technology - Output type (e.g., analysis, generation), Technology - Curation type (e.g., deterministic, curated options), and Technology - User Data access (e.g., input text, additional data). \n User box is on the left of the Interaction box, with the following points: Demographic profile (e.g., age, language and culture), User capabilities (e.g., writing expertise, efficiency), Relationship to system (e.g., agency, ownership, trust), and System output preferences (e.g., coherence, diversity). \n Technology box is on the left of Interaction box and below the User box, with the following points: Data - Source (e.g., experts, users), Data - Size (e.g., small, medium, large), Model - Type (e.g., rule-based, foundation models), Model - External resource access (e.g., tool, data), Learning - Problem (e.g., classification, generation), Learning - Algorithm (e.g., supervised, unsupervised), Learning - Training and adaptation (e.g., fine-tuning, prompting), Evaluation - Evaluator (e.g., automatic, machine-learned), Evaluation - Focus (e.g., linguistic quality, controllability), and Scalability (e.g., cost, latency)."
          className="block"
      />
    </div>

    <div className="pt-8 font-sans">
      <ul className="list-disc pl-4">
        <li><span className="font-bold">Want to add your paper/writing assistant to the list?</span> Please either (i) fill out <a href={FORM_URL} target="_blank" className="form-link">this Google form <span style={{ display: 'inline-block', transform: "translateY(0.5px)" }}><ClipboardIcon /></span></a> or (ii) create a pull request in <a href={GITHUB_URL} target="_blank" className="dsiiwa-link">our GitHub repository <span style={{ display: 'inline-block', transform: "translateY(0.5px)" }}><GitHubLogoIcon /></span></a></li>
        <li><span className="font-bold">Have questions or found incorrect annotation?</span> Please email Mina Lee <a href="mailto:mnlee@uchicago.edu" className="dsiiwa-link"> <span style={{ display: 'inline-block', transform: "translateY(1px)" }}><EnvelopeClosedIcon/></span></a></li>
        <li><span className="font-bold">Interested in contributing to the project?</span> Please visit <a href={GITHUB_URL} target="_blank" className="dsiiwa-link">our GitHub repository <span style={{ display: 'inline-block', transform: "translateY(0.5px)" }}><GitHubLogoIcon /></span></a> and start contributing!</li>
      </ul>
    </div>

    {/* <div className="flex flex-wrap justify-start items-start align-start space-x-0">
      {AUTHORS.map((author, index) => (
        <React.Fragment key={index}>{AuthorHoverCard2(author)}</React.Fragment>
      ))}
    </div> */}
  </PageHeader>
);

export default function Home() {
  return (
    <div className="container min-h-screen relative px-16 pt-8 pb-16">
      <Headline />
      <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow" id="annotated-papers">
        <TaskPage />
      </div>

      <div className="pt-16">
        <p className="pb-4">
          <span className="font-bold">Authors</span>: Mina Lee <a href="mailto:mnlee@uchicago.edu" className="dsiiwa-link"> <span style={{ display: 'inline-block', transform: "translateY(1px)" }}><EnvelopeClosedIcon/></span></a>, Katy Ilonka Gero, John Joon Young Chung, Simon Buckingham Shum, Vipul Raheja, Hua Shen, Subhashini Venugopalan, Thiemo Wambsganss, David Zhou, Emad A. Alghamdi, Tal August, Avinash Bhat, Madiha Zahrah Choksi, Senjuti Dutta, Jin L.C. Guo, Md Naimul Hoque, Yewon Kim, Seyed Parsa Neshaei, Agnia Sergeyuk, Antonette Shibani, Disha Shrivastava, Lila Shroff, Jessi Stark, Sarah Sterman, Sitong Wang, Antoine Bosselut, Daniel Buschek, Joseph Chee Chang, Sherol Chen, Max Kreminski, Joonsuk Park, Roy Pea, Eugenia H. Rho, Shannon Zejiang Shen, Pao Siangliulue
        </p>
        <p className="pb-4">
          <span className="font-bold">Core group of annotators</span>: Avinash Bhat, Simon Buckingham Shum, Agnia Sergeyuk, Yewon Kim, David Zhou, Emad A. Alghamdi, Jin L.C. Guo, Seyed Parsa Neshaei, Hua Shen, Md Naimul Hoque, Madiha Zahrah Choksi, Katy Ilonka Gero, Sarah Sterman, Antonette Shibani, Mina Lee
        </p>
        <p className="pb-4">
          <span className="font-bold">Designer of this artifact</span>: Shannon Zejiang Shen, Mina Lee
        </p>
      </div>
    </div>
  );
}
