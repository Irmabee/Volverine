"""
Python function to export file to pdf format.
Furthere development needed so not implemented in final product yet.
"""

from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from reportlab.lib import colors

def export_table_to_pdf(filename, data):
    # Create a PDF document
    doc = SimpleDocTemplate(filename, pagesize=letter)
    elements = []


    table = Table(data)

    style = TableStyle([])

    elements.append(table)

    doc.build(elements)

if __name__ == "__main__":
    data = []
    export_table_to_pdf("table_output.pdf", data)
