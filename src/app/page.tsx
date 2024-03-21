"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import React, { RefObject, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

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


const PAPER_URL = "TODO";
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
    <PageHeaderHeading className="tracking-tight">{TITLE} <a href="TODO" className="dsiiwa-link ml-2"><FontAwesomeIcon icon={faFilePdf} /></a> </PageHeaderHeading>
    <Separator className="my-2" />

    <div className="pt-8">
      <p className="pb-4">Welcome to our design space for intelligent and interactive writing assistants! The design space consists of five aspects: <span className="dsiiwa-task-color font-bold">task</span>, <span className="dsiiwa-user-color font-bold">user</span>, <span className="dsiiwa-technology-color font-bold">technology</span>, <span className="dsiiwa-interaction-color font-bold">interaction</span>, and <span className="dsiiwa-ecosystem-color font-bold">ecosystem</span>. Within each aspect, we define dimensions (i.e., fundamental components of an aspect) and codes (i.e., potential options for each dimension). Please refer to <a href="TODO" className="dsiiwa-link">our paper</a> for the detailed definitions of each dimension and code.</p>
      
      <p className="pb-4">With this design space, we annotated 115 papers from NLP and HCI fields to understand the current landscape of writing assistants. We hope that our design space offers researchers and designers a practical tool to navigate, comprehend, and compare the various possibilities of writing assistants, and aid in the envisioning and design of new writing assistants.</p>

      <p className="pb-4">Our design space is a <span className="font-bold">living artifact</span>, as it will evolve over time alongside the field. We invite the community to contribute to this artifact by adding new papers, annotations, and discussions to track future developments in this space. Please visit <a href="https://github.com/writing-assistant/writing-assistant.github.io" className="dsiiwa-link">our GitHub repository <FontAwesomeIcon icon={faGithub} /></a> and contribute to the artifact.</p>
    </div>

    {/* add an image from url */}
    <div className="dsiiwa-figure pt-8">
      <img src="https://brushbrushbrushyourteeth.files.wordpress.com/2024/03/design_space.png"/>
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
      <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
        <TaskPage />
      </div>

      <div className="pt-16">
        <p className="pb-4">
          <span className="font-bold">Authors</span>: Mina Lee <a href="mailto:mnlee@uchicago.edu"  className="dsiiwa-link"><FontAwesomeIcon icon={faEnvelope} /></a>, Katy Ilonka Gero, John Joon Young Chung, Simon Buckingham Shum, Vipul Raheja, Hua Shen, Subhashini Venugopalan, Thiemo Wambsganss, David Zhou, Emad A. Alghamdi, Tal August, Avinash Bhat, Madiha Zahrah Choksi, Senjuti Dutta, Jin L.C. Guo, Md Naimul Hoque, Yewon Kim, Seyed Parsa Neshaei, Agnia Sergeyuk, Antonette Shibani, Disha Shrivastava, Lila Shroff, Jessi Stark, Sarah Sterman, Sitong Wang, Antoine Bosselut, Daniel Buschek, Joseph Chee Chang, Sherol Chen, Max Kreminski, Joonsuk Park, Roy Pea, Eugenia H. Rho, Shannon Zejiang Shen, Pao Siangliulue
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
