# import sys
# import json
# import spacy
# import re
# from PIL import Image
# import pytesseract
# import fitz  # PyMuPDF

# def extract_text_from_file(file_path):
#     if file_path.lower().endswith('.pdf'):
#         doc = fitz.open(file_path)
#         return "\n".join([page.get_text() for page in doc])
#     else:
#         return pytesseract.image_to_string(Image.open(file_path))

# def extract_vitals(text):
#     nlp = spacy.load("vitals_ner_model")
#     doc = nlp(text)

#     keyword_check = {
#         "HEMOGLOBIN": ["hemoglobin"],
#         "TEMPERATURE": ["temperature", "temp", "fever"],
#         "BLOOD_PRESSURE": ["blood pressure", "bp"],
#         "BLOOD_SUGAR": ["blood sugar", "sugar", "glucose"],
#         "FEMUR_LENGTH": ["femur length", "fl"],
#         "HEAD_CIRCUMFERENCE": ["head circumference", "hc"],
#         "ABDOMINAL_CIRCUMFERENCE": ["abdominal circumference", "ac"],
#         "BIPARIETAL_DIAMETER": ["biparietal diameter", "bpd"],
#         "WEIGHT": ["weight"],
#         "GLUCOSE_TOLERANCE": ["glucose tolerance", "gtt", "gt"],
#         "FETAL_HEART_RATE": ["fetal heart rate", "fhr"],
#         "CRL": ["crl"],
#         "NUCHAL_TRANSLUCENCY": ["nuchal translucency", "nt"]
#     }

#     vitals = {}

#     for ent in doc.ents:
#         label = ent.label_
#         ent_text = ent.text

#         if label != "WEIGHT" and not any(k in ent_text.lower() for k in keyword_check.get(label, [])):
#             continue

#         if label in ["ABDOMINAL_CIRCUMFERENCE", "HEAD_CIRCUMFERENCE"] and len(ent_text) > 30:
#             continue

#         match = None
#         if label in ["FEMUR_LENGTH", "CRL", "BIPARIETAL_DIAMETER", "HEAD_CIRCUMFERENCE",
#                      "ABDOMINAL_CIRCUMFERENCE", "HEMOGLOBIN", "TEMPERATURE",
#                      "BLOOD_SUGAR", "WEIGHT", "NUCHAL_TRANSLUCENCY"]:
#             match = re.search(r"(\d+(\.\d+)?)", ent_text)
#         elif label == "BLOOD_PRESSURE":
#             match = re.search(r"(\d+/\d+)", ent_text)
#         elif label == "FETAL_HEART_RATE":
#             match = re.search(r"(\d+)", ent_text)
#         elif label == "GLUCOSE_TOLERANCE":
#             match = re.search(r"(Normal|Abnormal|Positive|Negative|\d+(\.\d+)?)", ent_text, re.IGNORECASE)

#         if match:
#             vitals[label] = match.group(1) if match.lastindex else match.group()

#     if "WEIGHT" not in vitals:
#         match = re.search(r"Weight\s*:?[-\s]*([\d]+(\.\d+)?)", text, re.IGNORECASE)
#         if match:
#             vitals["WEIGHT"] = match.group(1)

#     return vitals

# if __name__ == "__main__":
#     file_path = sys.argv[1]
#     text = extract_text_from_file(file_path)
#     vitals = extract_vitals(text)
#     print(json.dumps(vitals))



import sys
import json
import re
from datetime import datetime
from pdf2image import convert_from_path
from PIL import Image
import pytesseract

# Set up your local tesseract and poppler paths
pytesseract.pytesseract.tesseract_cmd = r"D:\\ocr\\tesseract.exe"
poppler_path = r"C:\\Users\\Ashwanth\\Downloads\\Release-24.08.0-0\\poppler-24.08.0\\Library\\bin"

def extract_text_from_pdf(pdf_path):
    pages = convert_from_path(pdf_path, dpi=300, poppler_path=poppler_path)
    full_text = ""
    for i, page in enumerate(pages):
        text = pytesseract.image_to_string(page)
        full_text += f"\n--- Page {i + 1} ---\n{text}"
    return full_text

def extract_measurement(text, label, aliases):
    for alias in aliases:
        pattern = rf"{alias}\s*[:\-]*\s*(\d+(\.\d+)?)"
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return match.group(1)
    return None

# def extract_dates(text):
#     lmp_match = re.search(r"LMP date\s*[:\-]*\s*([0-9]{2}[/\-][0-9]{2}[/\-][0-9]{4})", text, re.IGNORECASE)
#     edd_match = re.search(r"LMP EDD\s*[:\-]*\s*([0-9]{2}[/\-][0-9]{2}[/\-][0-9]{4})", text, re.IGNORECASE)
#     ga_match = re.search(r"gestational age.*?(\d+\s*Weeks\s*\d+\s*Days)", text, re.IGNORECASE)

#     vitals = {}
#     if lmp_match:
#         try:
#             date_obj = datetime.strptime(lmp_match.group(1), "%d/%m/%Y").date()
#             vitals["LMP"] = str(date_obj)
#         except: pass

#     if edd_match:
#         try:
#             date_obj = datetime.strptime(edd_match.group(1), "%d/%m/%Y").date()
#             vitals["EDD"] = str(date_obj)
#         except: pass

#     if ga_match:
#         vitals["GA"] = ga_match.group(1)

#     return vitals
def extract_dates(text):
    lmp_match = re.search(r"LMP\s*(date)?\s*[:\-]*\s*([0-9]{2}[/\-][0-9]{2}[/\-][0-9]{4})", text, re.IGNORECASE)
    edd_match = re.search(r"(LMP\s*)?EDD\s*[\[:\-]*\s*([0-9]{2}[/\-][0-9]{2}[/\-][0-9]{4})[\]]?", text, re.IGNORECASE)
    ga_match = re.search(r"gestational age.*?(\d+\s*Weeks\s*\d+\s*Days)", text, re.IGNORECASE)

    vitals = {}
    if lmp_match:
        try:
            date_obj = datetime.strptime(lmp_match.group(2), "%d/%m/%Y").date()
            vitals["LMP"] = str(date_obj)
        except: pass

    if edd_match:
        try:
            date_obj = datetime.strptime(edd_match.group(2), "%d/%m/%Y").date()
            vitals["EDD"] = str(date_obj)
        except: pass

    if ga_match:
        vitals["GA"] = ga_match.group(1)

    return vitals

def estimate_efw(fl, bpd, ac):
    try:
        fl = float(fl)
        bpd = float(bpd)
        ac = float(ac)
        log_efw = 1.326 + 0.0107 * bpd + 0.0438 * ac + 0.158 * fl - 0.00326 * ac * fl
        efw = round(10 ** log_efw, 2)
        return efw
    except:
        return None

def extract_vitals(text):
    vitals = extract_dates(text)

    vitals["FEMUR_LENGTH"] = extract_measurement(text, "FEMUR_LENGTH", ["FL"])
    vitals["BIPARIETAL_DIAMETER"] = extract_measurement(text, "BPD", ["BPD"])
    vitals["ABDOMINAL_CIRCUMFERENCE"] = extract_measurement(text, "AC", ["AC"])
    vitals["HEAD_CIRCUMFERENCE"] = extract_measurement(text, "HC", ["HC"])

    if all(vitals.get(k) for k in ["FEMUR_LENGTH", "BIPARIETAL_DIAMETER", "ABDOMINAL_CIRCUMFERENCE"]):
        efw = estimate_efw(vitals["FEMUR_LENGTH"], vitals["BIPARIETAL_DIAMETER"], vitals["ABDOMINAL_CIRCUMFERENCE"])
        if efw:
            vitals["EFW"] = efw

    return {k: v for k, v in vitals.items() if v is not None}

if __name__ == "__main__":
    file_path = sys.argv[1]
    text = extract_text_from_pdf(file_path)
    vitals = extract_vitals(text)
    print(json.dumps(vitals))
