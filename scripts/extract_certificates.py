#!/usr/bin/env python3
import os
import sys
import subprocess
import glob

def main():
    print("=== SURIYANARAYANAN R PORTFOLIO - CERTIFICATE PDF EXTRACTOR ===")
    
    # Target search paths for 'certificates earned.pdf' or any certificate pdf
    candidates = [
        "certificates earned.pdf",
        "certificates_earned.pdf",
        "certificates.pdf",
        "public/certificates earned.pdf",
        "public/certificates/certificates earned.pdf",
        "public/certificates/certificates.pdf"
    ] + glob.glob("*.pdf") + glob.glob("public/*.pdf") + glob.glob("public/certificates/*.pdf")

    pdf_file = None
    for c in candidates:
        if os.path.exists(c):
            pdf_file = c
            break

    if not pdf_file:
        print("\n[!] No 'certificates earned.pdf' found in the project root or public/ folder.")
        print("[!] Please upload your 'certificates earned.pdf' to the project root directory or public/certificates/.")
        sys.exit(1)

    print(f"[*] Found PDF: {pdf_file}")
    output_dir = "public/certificates"
    os.makedirs(output_dir, exist_ok=True)

    output_pattern = os.path.join(output_dir, "cert_page_%02d.png")
    
    # Run Ghostscript to extract every page as a high-resolution PNG (175 DPI)
    cmd = [
        "gs",
        "-dNOPAUSE",
        "-dBATCH",
        "-sDEVICE=png16m",
        "-r175",
        f"-sOutputFile={output_pattern}",
        pdf_file
    ]
    
    print(f"[*] Extracting all pages with Ghostscript to {output_dir}...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        print("[!] Ghostscript error:")
        print(result.stderr)
        sys.exit(1)
        
    extracted_images = sorted(glob.glob(os.path.join(output_dir, "cert_page_*.png")))
    count = len(extracted_images)
    print(f"[✓] SUCCESS: Extracted {count} certificate page(s) into '{output_dir}':")
    for img in extracted_images:
        print(f"    - {img} ({os.path.getsize(img) // 1024} KB)")

if __name__ == "__main__":
    main()
