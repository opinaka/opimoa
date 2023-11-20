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

from browser import document
import sys
import traceback

class myStringOut:
#=================
    def write(self, strS):            
        # Ajoute le texte affiché par la commande "print" au texte de "idTextarea1" 
        document["idTextarea1"].value += strS 

def ExecPythonCode(event):
#===========================
    ''' Exécute le code de la fenêtre de "Code python".
        L'instruction "print(...)" affiche dans la fenêtre d'affichage.  '''
    sss = myStringOut()  # Objet qui sera utilisé par l'instruction "print"
    sys.stdout = sss  # Associe la sortie de "print" à la méthode write de myStringOut
    theCode = document["idTextarea3"].value # Lecture du contenu de la fenêtre du code Python.
    try:
      exec(theCode) # Exécute le code Python
    except:
      # Il y a eu une erreur, qui sera affiché dans le même "idTextarea1" 
      strOutput = traceback.format_exc() # Récupère le message d'erreur
      document["idTextarea1"].value += strOutput # Ajoute le message d'erreur au texte de "idTextarea1"           

    document["idTextarea1"].scrollTop = 100000  # pour rester en fin du texte.

document["idExecPython"].bind("click", ExecPythonCode)
