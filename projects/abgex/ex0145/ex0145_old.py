# Adjonction de fonctionnalités à Blockly
# #######################################
#
# c.f. : https://brython.info/
# c.f. : https://deusyss.developpez.com/tutoriels/Python/web/brython/
#
# Questions :
# 1) Comment faire pour que l'instruction "print" affiche dans la fenêtre "Affichage" prévue à cet effet ?
# c.f. test51_print_in_textarea.html  pour rediriger le "print" vers un textarea
# 2) Comment faire pour qu'une fonction javascript appelle une fonction Python ?
# c.f. test52_brython_appelle_javascript_fonction.html
# 3) Comment faire pour qu'une fonction Python appelle une fonction javascript ?
# c.f. test52_brython_appelle_javascript_fonction.html


#from browser import document, alert, html
from browser import document
import sys
from io import StringIO
import traceback

# sys.stdout = document # Redirige le "print(...)" vers le document, donc détruit tout le code html.

def ExecPythonCode(event):
#===========================
    ''' Exécute le code de la fenêtre de "Code python".
        L'instruction "print(...)" affiche dans la fenêtre d'affichage.  '''
    # alert("hello") # Fonctionne !
    # print("dans la console, par défaut") # Écrit dans la console
    # document["idZone1"].text = "New content" # Fonctionne, si une balise "idZone1" existe
    sss = StringIO()  # Crée un buffer où le texte affiché avec "print" sera stocké
    sys.stdout = sss  # Associe la sortie de "print" au buffer
    theCode = document["idTextarea3"].value # Lecture du contenu de la fenêtre du code Python.
    # document["idZone1"].text = theCode  # Fonctionne, si une balise "idZone1" existe
    # document["idTextarea1"].value = theCode # Écrit dans la fenêtre d'affichage
    # exec(theCode) # Exécution du code python.  "print" écrit par défaut dans la console
    try:
      exec(theCode) # Exécute le code Python
      strOutput = sss.getvalue()  # Récupère ce qui a été affiché
    except:
      # Il y a eu une erreur, qui sera affiché dans le même "idTextarea1" 
      strOutput = traceback.format_exc() # Récupère le message d'erreur
          
    document["idTextarea1"].value += strOutput # Ajoute le texte affiché par la commande "print" au texte de "idTextarea1" 
    document["idTextarea1"].scrollTop = 100000  # pour rester en fin du texte.

document["idExecPython"].bind("click", ExecPythonCode)
