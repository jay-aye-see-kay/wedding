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
- [ ] make the floral overlay scroll slower than the rest of the page
- [ ] get rid of the nav bar, just use buttons on each page to link back and forth
- [ ] the RSVP form should have a cancel/back button
- [ ] the RSVP form should have a loading state
- [ ] the RSVP form have a success message (and maybe redirect/hide the form)

## How Google sheets was setup

1. Enable sheets access in google cloud: [](https://console.cloud.google.com/apis/enableflow?apiid=sheets.googleapis.com)
2. create a service account [](https://console.cloud.google.com/apis/credentials)
3. download a key.json, then copy the private key to the environment variable `GSHEETS_PRIVATE_KEY`
4. add the service account's email to the google sheet you want to access
