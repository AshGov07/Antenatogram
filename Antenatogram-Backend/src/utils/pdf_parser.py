parameter_mapping = {
    "Hemoglobin": "hemoglobin",
    "Glucose Tolerance": "glucoseTolerance",
    "Fetal Heart Rate": "fetalHeartRate",
    # Add more mappings as needed
}
import re

def extract_value(text, parameter_name):
    pattern = f"{parameter_name}:\\s*([\\d.]+)"
    match = re.search(pattern, text, re.IGNORECASE)
    if match:
        return float(match.group(1))
    return None
from pdfminer.high_level import extract_text

def extract_data_from_pdf(pdf_path):
    text = extract_text(pdf_path)
    return text
