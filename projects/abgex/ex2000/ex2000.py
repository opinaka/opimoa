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
        document["idTextareaDisplay"].value += strS 

def ExecPythonCode(event):
#===========================
    ''' Exécute le code de la fenêtre de "Code python".
        L'instruction "print(...)" affiche dans la fenêtre d'affichage.  '''
    sss = myStringOut()  # Objet qui sera utilisé par l'instruction "print"
    sys.stdout = sss  # Associe la sortie de "print" à la méthode write de myStringOut
    theCode = document["idTextareaCodePython"].value # Lecture du contenu de la fenêtre du code Python.
    try:
      exec(theCode) # Exécute le code Python
    except:
      # Il y a eu une erreur, qui sera affiché dans le même "idTextarea1" 
      strOutput = traceback.format_exc() # Récupère le message d'erreur
      document["idTextareaDisplay"].value += strOutput # Ajoute le message d'erreur au texte de "idTextarea1"           

    document["idTextareaDisplay"].scrollTop = 100000  # pour rester en fin du texte.

def ClearDisplay():
#==================
    ''' Efface de contenu de la fenêtre d'affichage.'''
    document["idTextareaDisplay"].value = ""


def Pause_execution(vTime, strSpeed):
#====================================
    ''' Fait une pause durant l'exécution du code.'''
    # À FAIRE...
    vTime = vTime
    # time.sleep(vTime) # Non implémenté, à voir comment faire ???
    

def Variable_Spy(vTime, strVariablesName, v0='', v1='', v2='', v3='', v4='', v5='', v6='', v7='', v8='', v9='', va='', vb='', vc='', vd='', ve='', vf='', vg='', vh=''):
#=======================================================================================================================================================================
    # On est obligé d'envoyer chaque variable séparément, on ne peut pas les envoyer dans un tableau.
    # Ecrit dans une partie de la fenêtre, divers informations.
    # La forme "nameTextareaVariableSpy" a été définie dans la page HTML. 
    # sous la définition de la '<div id="idVariableSpy" ...'.
    # vTime = temps de pause en secondes

    if (strVariablesName != "0"):
      # Il y a des variables à afficher
      # À TRADUIRE...
      #var aData = strVariablesName.split(",") # Récupère les noms des différentes variables.
      #var strMsg  = '';

      # Longue suite, mais difficile de faire autrement à cause des v_j
      #if (aData.length >  0): strMsg  = aData[ 0] + " : " + v0 + "\n"
      #if (aData.length >  1): strMsg += aData[ 1] + " : " + v1 + "\n"
      #if (aData.length >  2): strMsg += aData[ 2] + " : " + v2 + "\n"

      strMsg = strVariablesName + " " + str(v0)
      document["idTextareaVariableSpy"].value = strMsg

    # Attente avant de continuer l'exécution du programme
    Pause_execution(vTime, '')


def CardFlip(nFrame, nTimeDelta):
#================================
    ''' Retourne la carte de la case  nFrame.'''
    print("Retourne la carte de la case")


document["idExecPython"].bind("click", ExecPythonCode)

