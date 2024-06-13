import eel
import subprocess
import wx
import os 

# Initialize Eel with the web folder
eel.init('web')

memory_dump_path = 'C:/Users/irmab/OneDrive/Desktop/Win11Dump/Win11Dump.mem'

@eel.expose
def open_file(wildcard="*"):
    app = wx.App(None)
    style = wx.FD_OPEN | wx.FD_FILE_MUST_EXIST
    dialog = wx.FileDialog(None, 'Open', wildcard=wildcard, style=style)
    if dialog.ShowModal() == wx.ID_OK:
        path = dialog.GetPath()
    else:
        path = None
    dialog.Destroy()                    
    global memory_dump_path
    memory_dump_path = path
    return path

@eel.expose
def run_pslist():
    if not memory_dump_path:
        return "Please select a memory dump file first."
    return run_volatility_command('windows.pslist.PsList')


@eel.expose
def run_netscan():
    if not memory_dump_path:
        return "Please select a memory dump file first."
    return run_volatility_command('windows.netscan.NetScan')

@eel.expose
def run_malfind():
    if not memory_dump_path:
        return "Please select a memory dump file first."
    return run_volatility_command('windows.malfind')

def run_volatility_command(command):
    volatility_path = r'vol/vol.exe'
    try:
        result = subprocess.run([volatility_path, '-f', memory_dump_path, command], capture_output=True, text=True, check=True)
        return format_output_as_html(result.stdout)
    except subprocess.CalledProcessError as e:
        return f"Error running {command}: {e}"

def format_output_as_html(output):
    lines = output.splitlines()
    if len(lines) < 2:
        return "<pre>{}</pre>".format(output)
    
    headers = lines[0].split()
    rows = [line.split() for line in lines[1:]]

    table = "<table border='1'><tr>"
    for header in headers:
        table += f"<th>{header}</th>"
    table += "</tr>"

    for row in rows:
        table += "<tr>"
        for cell in row:
            table += f"<td>{cell}</td>"
        table += "</tr>"
    
    table += "</table>"
    return table

eel.expose
def clear_terminal(output):
     output.delete(1.0)
# Start the Eel application
eel.start('index.html', port=8001, size=(800, 600))
