module Data.Notes exposing (Note, PlanNotes, myNotes)

import Data.Preferences exposing (Stage(..))
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, id, name, src)


type alias Note =
    String


type alias PlanNotes =
    { labor : List Note
    , birth : List Note
    , postpartum : List Note
    }


myNotes : PlanNotes
myNotes =
    { labor = laborNotes
    , birth = birthNotes
    , postpartum = postpartumNotes
    }


laborNotes : List Note
laborNotes =
    [ "Priorizar un parto natural vaginal humanizado sin medicamentos ni anestesia, muy poca intervención médica."
    , "No hacer enemas, lavado vaginal (clorhexidina) ni episiotomía. No rasurar vello púbico."
    , """No cardiotocografía: La CTG continua puede restringir otras intervenciones beneficiosas durante el trabajo de parto,
         como tener una opción de trabajo de parto y posiciones de nacimiento, y poder caminar libremente,
         y puede ser estresante para las mujeres. 
         Sí auscultación intermitente: ispositivo de ecografía Doppler o estetoscopio de Pinard."""
    , "Equipo médico, etc. femenino siempre preferible y limitar el número de personas en el parto."
    , "No amniotomía, oxitocina ni antiespasmódicos para prevenir el retraso en el trabajo de parto."
    , "Si es que requiero alivio de dolor, antes de epidural móvil: usar analgésicos (fenatilo, diamorfina y petidina)."
    ]


birthNotes : List Note
birthNotes =
    [ " Masajes perineales, compresas tibias y conducta de protección activa del perineo."
    , "No fórceps ni succión (ventosa)."
    , """En caso de cesárea NECESARIA, hacerla HUMANIZADA; No poner cortina divisoria entre Mamá y el procedimiento,
       Papá o Mamá reciben al bebé cuando la Doctora lo indique,
       Inmeditamente se coloca al bebé de manera transversal en Mamá o en su defecto, 
       en Papá, y ahí se realizan las pruebas neonatólogas pertinentes."""
    ]


postpartumNotes : List Note
postpartumNotes =
    [ "Evaluación del tono muscular del útero, oxitocina (10 UI, IM/IV) como medicamento uterotónico."
    , "Priorizar pecho, preguntar a Mamá siempre permiso para baño y alimentación (fórmula) del Bebé."
    ]
