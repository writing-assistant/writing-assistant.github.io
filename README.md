# A Design Space for Intelligent and Interactive Writing Assistants

This is the repository for the website of the paper [A Design Space for Intelligent and Interactive Writing Assistants (Lee et al., CHI 2024)](https://arxiv.org/abs/2403.14117). The website is hosted at [https://writing-assistant.github.io/](https://writing-assistant.github.io/).

---

## How to Add Your Paper

***If you have paper(s) that design, use, or evaluate writing assistant(s), we would love to feature them on our website!***

* If you are familiar with Github, you can create a pull request (PR) to update `./data/annotated_papers.csv` in this repository.
* Otherwise, please fill out [this Google form](https://forms.gle/auceKL8yv9t1pgJaA).

We will try to monitor the form and PR regularly, but in case there is considerable delay, please feel free to send an email to Mina.

#### Contact

* Maintenance: [Mina Lee](https://minalee.info/) \<mnlee@uchicago.edu\>
* Designer: [Shannon Zejiang Shen](https://www.szj.io/) \<zjshen@mit.edu\>

---

## How to Contribute

***We welcome your feedback and contribution!***

#### Features in the wishlist 
Last updated: May 6, 2024

* Add authors to the table and enable search based on authors

#### Running the website locally

1. Clone the repository

```bash
git clone https://github.com/writing-assistant/writing-assistant.github.io.git
cd writing-assistant.github.io
```

2. Install required libraries

```bash
npm ci
```

3. Run the development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Development notes

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

---

## Acknowledgements

Our design and code is heavily inspired by the [shadcn/ui](https://ui.shadcn.com/) website. 
