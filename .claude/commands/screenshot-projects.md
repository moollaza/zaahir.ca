# Update Project Screenshots

Capture fresh screenshots of all project websites on the portfolio page.

## Steps

1. Run the screenshot script:

   ```
   node scripts/screenshot-projects.mjs
   ```

   Or for specific projects only:

   ```
   node scripts/screenshot-projects.mjs <slug1> <slug2>
   ```

   Available slugs: repo-remover, quick-budget, how-many-rakats, personal-website, uncovr, autobill

2. Review the captured screenshots by checking the git diff for changed images.

3. If any screenshots failed, investigate the failure and decide whether to retry or skip.

4. Do NOT commit automatically -- let the user review the image changes first.
