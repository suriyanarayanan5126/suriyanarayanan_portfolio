SURIYANARAYANAN R PORTFOLIO — SEPARATE CERTIFICATE PDF DIRECTORY
==================================================================

DIRECTORY PATH: public/certificates/

This folder hosts each of your separate individual certificate PDF documents (.pdf).
Managing certificates works exactly like project videos:

1. HOW TO UPLOAD EACH SEPARATE PDF:
   Place each certificate PDF into this folder with its registered filename:
   e.g. public/certificates/kings-project-expo-2026.pdf
   
   OR upload each PDF directly through the website UI using the "Select Certificate PDF" button
   on each certificate card!

2. AUTOMATIC HIGH-RES RENDERING:
   When you upload or place an individual PDF, the website automatically:
   - Renders page 1 into a crisp retina image preview for the card and modal.
   - Provides an instant "Download PDF" / "Inspect PDF" button in the modal.

3. CONFIGURATION FILE & FIELDS:
   File: src/data/portfolioData.ts
   List: CERTIFICATES_DATA

   Each certificate entry is configured with:
   - title: Display name of the certificate
   - fileName: Exact PDF filename (e.g. "kings-project-expo-2026.pdf")
   - filePath: Web route (e.g. "/certificates/kings-project-expo-2026.pdf")
   - issuer, category, date, achievementLevel, verificationId, details

4. CURRENT REGISTERED INDIVIDUAL CERTIFICATE PDF FILENAMES:
   1. kings-project-expo-2026.pdf           -> Kings Project Expo '26 — Digital Oorai Display
   2. freq-fest-24.pdf                     -> Freq Fest 24 International Symposium — 1st Place
   3. acmet-2k25.pdf                       -> Acmet '2k25 13th National Level Technical Fest — I Prize
   4. electrovibez-23.pdf                  -> Electrovibez '23 National Level Technical Symposium — II Prize
   5. mini-project-expo-2023.pdf           -> Mini Project Expo 2023 — 1st Place
   6. mini-project-expo-2024.pdf           -> Mini Project Expo 2024 — II nd Position
   7. ibm-skillsbuild-ai-fundamentals.pdf  -> Artificial Intelligence Fundamentals (IBM SkillsBuild)
   8. nxtwave-build-static-website.pdf     -> Build Your Own Static Website (NxtWave CCBP 4.0)
   9. nxtwave-build-responsive-website.pdf -> Build Your Own Responsive Website (NxtWave CCBP 4.0)
   10. iot-workshop-arduino-raspberry-pi.pdf -> Two Days Workshop on IoT (Kings College & IEEE)
   11. ipr-patents-innovation-lecture.pdf  -> Role of Innovation & IPR / Patents (MIC AICTE)
   12. edunet-aicte-ai-ml-internship.pdf   -> Edunet & AICTE AI & Machine Learning 6-Week Internship
   13. bsnl-telecom-internship.pdf         -> BSNL Internship Training Certificate

   [RESERVED / EXCLUDED]:
   - java-full-stack-certification.pdf     -> Java Full Stack Development (isExcluded: true)
   - fantasy-solution-ai-training.pdf      -> Fantasy Solution AI Training (isExcluded: true)

5. ADDING FUTURE CERTIFICATE PDFS:
   To add any new certificate in the future:
   1. Drop your PDF into public/certificates/<your-filename>.pdf
   2. Add a new item to CERTIFICATES_DATA in src/data/portfolioData.ts with its fileName and filePath.
