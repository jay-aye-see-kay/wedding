# Getting Started

- Get a private key for google sheets and save it as `GSHEETS_PRIVATE_KEY` in `.env.local`
- Install `nodejs` and `pnpm`

```bash
pnpm install
pnpm dev
```

---

# Other notes

## Still todo

- [ ] get some nice leaves/flowers to overlay so it looks nice
- [x] make the floral overlay scroll slower than the rest of the page
- [x] get rid of the nav bar, just use buttons on each page to link back and forth
- [x] the RSVP form should have a cancel/back button
- [x] the RSVP form should have a loading state
- [x] the RSVP form have a success message (and maybe redirect/hide the form)
- [x] add fields to the RSVP form
  - [x] a yes/no at the start
  - [x] a paragraph at the top of both variants (inc the soft no kids bit)
  - [x] best contact (email)
  - [x] a better "names" field? maybe on that adds more? maybe not, maybe just a textarea?
  - [x] swap the "secret code" for a simple puzzle (like a captcha)

## How Google sheets was setup

1. Enable sheets access in google cloud: [](https://console.cloud.google.com/apis/enableflow?apiid=sheets.googleapis.com)
2. create a service account [](https://console.cloud.google.com/apis/credentials)
3. download a key.json, then copy the private key to the environment variable `GSHEETS_PRIVATE_KEY`
4. add the service account's email to the google sheet you want to access
