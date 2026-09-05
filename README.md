# CARE Practice Coach

A guided practice tool for **SW 605: Technology in Social Work Practice**. Students use fictional cases to examine technology decisions, receive formative AI feedback, strengthen their reasoning, and prepare a Canvas-ready Practice Record.

**Your professional judgment remains your own.** The coach supports reflection; its feedback is not a grade or a declaration of the correct decision.

## The CARE framework

| Element | Questions to explore |
| --- | --- |
| **C — Context** | Who is affected? How do access, setting, power, obligations, and alternatives shape the decision? |
| **A — Authority** | What may the technology do? Who controls it, can override it, and remains accountable? |
| **R — Risk and reversibility** | What if the technology is wrong or fails? Who bears the harm, and can the decision be reversed safely? |
| **E — Engagement** | How should affected clients, communities, and practitioners influence design, testing, correction, and review? |

Students also identify a design safeguard, meaningful human oversight, a stop condition, and a safe fallback.

## How students use it

1. **Select:** Choose one of 12 modules and confirm that only fictional information will be used.
2. **Analyze:** Read the case and answer nine prompts, beginning with an initial professional judgment.
3. **Review:** Consider feedback across five criteria: Context, Authority, Risk and reversibility, Engagement, and Professional judgment and safeguards. Ratings are **Strong**, **Developing**, or **Revisit**, with strengths, improvements, and up to two follow-up questions.
4. **Revise:** Revise or confirm the analysis, state a final judgment, and explain what changed or was clarified. Agreement with the coach is not required.
5. **Submit:** Copy the Practice Record, open the matching Canvas assignment, paste it into Text Entry, and submit in Canvas.

The coach provides an assignment link; it does not automatically submit work or synchronize grades.

## Fictional practice cases

| Module | Case |
| --- | --- |
| 1 | The Appointment Summary |
| 2 | The Mobile Only Renewal |
| 3 | The Benefits Navigator |
| 4 | The Harbor House Pilot |
| 5 | The Community Connection Account |
| 6 | The Intake Shortcut |
| 7 | The Engagement Drop Off |
| 8 | The Advocacy Dashboard |
| 9 | The Immersive Pilot |
| 10 | The Virtual Clinic Queue |
| 11 | The Resource Ranking Tool |
| 12 | The Next Generation Service Lab |

## Privacy and learning boundaries

- Use only the supplied fictional course cases. Do not enter real client, patient, agency, field-placement, health, contact, or identifying information.
- Requesting feedback sends the selected fictional case and initial analysis responses to the OpenAI API through the application server.
- The supplied application has no database or persistent response storage. Work is held in browser memory and can be lost on refresh or when the page closes. Copy the final record before leaving. This does not describe retention by the API provider or hosting service.
- Feedback is intended for formative learning. The coaching instructions prohibit model answers and legal or clinical advice; students remain responsible for evaluating the feedback.
- Keep the API key on the server. Never commit it to GitHub or place it in browser code.

## Download and run locally

The application source is currently packaged in [CARE-Practice-Coach-GitHub.zip](CARE-Practice-Coach-GitHub.zip). Download and extract that archive first. Run the following commands from the extracted folder containing `package.json`.

**Requirements:** Node.js 20.9 or newer, npm, and an OpenAI API key for feedback.

```sh
npm install
```

Copy `.env.example` to `.env.local`, then add your key:

```dotenv
OPENAI_API_KEY=your_api_key_here
```

Start the development server:

```sh
npm run dev
```

Open **http://localhost:3000**. To build and run a production version locally:

```sh
npm run build
npm run start
```

## Project structure and customization

Paths below refer to files inside the extracted archive.

| File | Purpose |
| --- | --- |
| `app/page.tsx` | CARE questions, five-stage activity, revisions, and Practice Record |
| `lib/cases.ts` | Twelve fictional cases, feedback priorities, and Canvas assignment links |
| `app/api/feedback/route.ts` | Server-side AI request, coaching instructions, and structured feedback schema |
| `app/globals.css` | Application styles |
| `.env.example` | Environment variable template |
| `netlify.toml` | Included Netlify build configuration |

The supplied project uses Next.js, React, TypeScript, and Tailwind CSS. The feedback route is configured to use `gpt-5-mini`.

For another course, update the cases and Canvas assignment URLs in `lib/cases.ts`, and review the questions and feedback instructions for the intended learning outcomes.

## Hosting

Before importing this repository into a hosting service, extract and commit the application files so `package.json` and the source folders are available to the build system. The ZIP archive alone is not a runnable deployment. Configure `OPENAI_API_KEY` as a server-side environment variable in the hosting environment.

## Troubleshooting

- **“The feedback service is not configured.”** Add `OPENAI_API_KEY` to `.env.local` or the hosting environment, then restart or redeploy.
- **Feedback could not be generated:** Check the server logs and API configuration, then try again.
- **Canvas assignment will not open:** Sign in with the appropriate course account and verify the assignment link in `lib/cases.ts`.
