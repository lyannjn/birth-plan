module Data.Preferences exposing (..)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (href)
import Icon exposing (..)


type alias Preference msg =
    { desc : String
    , stage : Stage
    , icon : Icon
    , id : String
    , details : Html msg
    }


type Stage
    = Labor
    | VaginalBirth
    | Postpartum


myPreferences : List (Preference msg)
myPreferences =
    [ { desc = "No líquidos intravenosos (IV)"
      , stage = Labor
      , icon = Iv
      , id = "iv"
      , details =
            div []
                [ p [] [ h3 [] [ text """Se debe alentar a las mujeres de bajo riesgo a beber líquidos durante el parto 
      y estar en contra de esta intervención""" ] ]
                , p []
                    [ text "IV aumenta el costo, tiene un impacto considerable en el uso de recursos y reduce la movilidad de las mujeres."
                    ]
                , p []
                    [ a [ href "http://apps.who.int/iris/bitstream/handle/10665/112825/9789241507363_eng.pdf" ]
                        [ text "Consulta manual de las 'Recomendaciones de la OMS para la conducción del trabajo de parto'" ]
                    ]
                ]
      }
    , { desc = "Limitar tacto vaginal (cada 4 hrs)"
      , stage = Labor
      , icon = Vagexam
      , id = "vag-exam"
      , details =
            div []
                [ p [] [ h3 [] [ text "Para disminuir factores de riesgo de infecciones" ] ]
                , p []
                    [ text """Se reconocen a los exámenes vaginales múltiples como contribuyentes a las morbilidades infecciosas 
      (en la madre e infante) asociadas con trabajo de parto prolongado."""
                    ]
                , p []
                    [ a [ href "http://apps.who.int/iris/bitstream/handle/10665/186171/9789241549363_eng.pdf" ]
                        [ text "Consulta manual de las 'Recomendaciones de la OMS para la conducción del trabajo de parto'" ]
                    ]
                ]
      }
    , { desc = "Comer y tomar libremente"
      , stage = Labor
      , icon = Food
      , id = "food-drink"
      , details =
            div []
                [ p [] [ h3 [] [ text """La restricción de la ingesta oral de líquidos y alimentos 
      no tiene efectos beneficiosos sobre los resultados clínicos importantes, incluido el uso de estimulación del trabajo de parto.""" ] ]
                , p []
                    [ text """Comer vs. No comer: No hubo diferencias significativas entre grupos para la duración del trabajo de parto, 
      cesárea, parto vaginal operatorio, uso de epidural, trabajo de parto aumento o resultados maternos adversos como náuseas o cetonuria. 
      No hubo datos estimables para Puntaje de Apgar a los cinco minutos."""
                    ]
                , p []
                    [ a [ href " http://apps.who.int/iris/bitstream/handle/10665/112825/9789241507363_eng.pdf" ]
                        [ text "Consulta manual de las 'Recomendaciones de la OMS para la conducción del trabajo de parto'" ]
                    ]
                ]
      }
    , { desc = "Contacto inmediato piel-con-piel mínimo 1hr"
      , stage = Postpartum
      , icon = Skintoskin
      , id = "skin-to-skin"
      , details =
            div []
                [ p [] [ h3 [] [ text """Los recién nacidos sin complicaciones deben mantenerse en contacto piel a piel 
      con sus madres durante la primera hora después del nacimiento para prevenir la hipotermia y promover la lactancia materna.""" ] ]
                , p []
                    [ text """Realizar las pruebas Apgar mientras el bebé está en el torso de la madre.""" ]
                , p []
                    [ text """Todos los recién nacidos deben recibir 1 mg de vitamina K por vía intramuscular (IM) después del nacimiento 
      (es decir, después de la primera hora en la que el bebé debe estar en contacto piel con piel con la madre y se debe iniciar la lactancia)"""
                    ]
                , p []
                    [ a [ href "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3206216/" ]
                        [ text "Consulta artículo de NIH" ]
                    ]
                ]
      }
    , { desc = "Amamantar dentro de la 1ra hora de vida"
      , stage = Postpartum
      , icon = Breastfeeding
      , id = "breast-feeding"
      , details =
            div []
                [ p []
                    [ h3 []
                        [ text """Todos los recién nacidos, incluidos los bebés con bajo peso al nacer (BPN) que pueden amamantar,
         deben ser amamantados lo antes posible después del nacimiento cuando estén clínicamente estables y la madre y el bebé estén listos."""
                        ]
                    ]
                , p []
                    [ text "Todos los bebés deben ser amamantados exclusivamente desde el nacimiento hasta (al menos) los 6 meses de edad."
                    ]
                , p []
                    [ a [ href "http://apps.who.int/iris/bitstream/handle/10665/259269/WHO-MCA-17.07-eng.pdf" ]
                        [ text "Consulta los lineamientos aprobados por el comité de revisión de las directrices de la OMS sobre la salud del recién nacido" ]
                    ]
                ]
      }
    , { desc = "Demorar el baño del Bebé por 24 horas"
      , stage = Postpartum
      , icon = Bath
      , id = "bath"
      , details =
            div []
                [ p []
                    [ h3 [] [ text "Para prevenir hipotermia y sus secuelas" ] ]
                , p []
                    [ text """La hipotermia neonatal es una afección común que afecta entre el 32 % y el 85 % de los recién nacidos hospitalizados. 
                El primer baño del recién nacido tiene como objetivo eliminar la sangre y el meconio de la piel, dejando intacto el vérnix. 
                Sin embargo, bañarse puede ser un procedimiento estresante para un recién nacido, 
                y el baño temprano puede desencadenar hipotermia y sus consecuencias, como hipoglucemia, hipoxia y hemorragia pulmonar. 
                El baño de los recién nacidos se lleva a cabo utilizando varios métodos, incluidos el baño en tina, el baño con esponja, 
                el baño con pañales y el baño con agua corriente."""
                    ]
                , p []
                    [ a [ href "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2763724/" ]
                        [ text "Consulta artículo de NIH" ]
                    ]
                ]
      }
    , { desc = "Bebé duerme en el cuarto con Mamá y Papá"
      , stage = Postpartum
      , icon = Cosleep
      , id = "co-sleep"
      , details =
            div []
                [ p [] [ h3 [] [ text "Así se alenta el vínculo emocional entre la familia." ] ]
                , p [] [ text "Se monitorea la lactancia y el baño del bebé, y se reduce el riesgo de Síndrome de Muerte Súbita." ]
                ]
      }
    , { desc = "No antibióticos rutinarios"
      , stage = Postpartum
      , icon = Drugs
      , id = "drugs"
      , details =
            div []
                [ p []
                    [ h3 []
                        [ text """Dadas las implicaciones potenciales para la salud pública de la alta tasa de uso rutinario de 
                          antibióticos después del parto vaginal sin ningún factor de riesgo específico en algunos entornos""" ]
                    ]
                , p []
                    [ text """Los antibióticos solo deben administrarse cuando hay signos clínicos de infección de una herida de 
                      episiotomía o desgarro perineal de segundo grado (que son anatómicamente similares)"""
                    ]
                , p []
                    [ a [ href "http://apps.who.int/iris/bitstream/handle/10665/186171/9789241549363_eng.pdf" ]
                        [ text "Consulta manual de las 'Recomendaciones de la OMS para la conducción del trabajo de parto'" ]
                    ]
                ]
      }
    , { desc = "Esperar la urgencia de pujar"
      , stage = VaginalBirth
      , icon = Waitpush
      , id = "wait-to-push"
      , details =
            div []
                [ p [] [ h3 [] [ text """Los proveedores de atención médica deben evitar imponer pujos dirigidos 
      a las mujeres en la segunda etapa del trabajo de parto, ya que no hay evidencia de ningún beneficio con esta técnica.""" ] ]
                , p [] [ text """Enseñar a las mujeres, por parte de los profesionales de la salud, 
      a seguir sus propios instintos para empujar cuando sientan la necesidad es más factible que enseñar a las mujeres 
      a realizar la maniobra de Valsalva.""" ]
                ]
      }
    , { desc = "NO maniobra de Kristeller o presión fúndica"
      , stage = VaginalBirth
      , icon = Kristeller
      , id = "kristeller"
      , details =
            div []
                [ p [] [ h3 [] [ text "Puede conducir a resultados adversos en el nacimiento" ] ]
                , p []
                    [ text """Al recibir presión fúndica, la madre puede experimentar más dolor después del parto 
      (evaluado en términos de requisitos analgésicos). Preocupaciones: ruptura uterina y de otros órganos, y muerte materna y perinatal"""
                    ]
                , p []
                    [ a [ href "https://apps.who.int/iris/bitstream/handle/10665/260178/9789241550215-eng.pdf" ]
                        [ text "Consulta las recomendaciones de la OMS de la atención intraparto para una experiencia de parto positiva" ]
                    ]
                ]
      }
    , { desc = "NO succionar nariz o boca del Bebé al nacer"
      , stage = VaginalBirth
      , icon = Suctioning
      , id = "suctioning"
      , details =
            div []
                [ p [] [ h3 [] [ text "Puede causar baja saturación de oxígeno" ] ]
                , p []
                    [ text """La succión oral y nasal de rutina en recién nacidos sanos normales inmediatamente 
      después del nacimiento se asocia con niveles más bajos de saturación de oxígeno (evidencia de alta calidad) 
      y puntuaciones de Apgar más bajas (evidencia de baja calidad)"""
                    ]
                , p []
                    [ a [ href "http://apps.who.int/iris/bitstream/handle/10665/75157/9789241503693_eng.pdf;jsessionid=7B11FDD8E75E4110300259EF8F387708" ]
                        [ text "Consulta las directrices de la OMS sobre la reanimación básica del recién nacido" ]
                    ]
                ]
      }
    , { desc = "Pinzamiento retrasado (por Papá) del cordón umbilical"
      , stage = VaginalBirth
      , icon = Cord
      , id = "cord"
      , details =
            div []
                [ p [] [ h3 [] [ text """Esperar 5 min. a que el cordón umbilical deje de pulsar; 
      para mejorar la salud materna e infantil y los resultados nutricionales""" ] ]
                , p []
                    [ text "Previene la hemorragia posparto y puede mejorar el estado de hierro del bebé hasta 6 meses después del nacimiento."
                    ]
                , p []
                    [ a [ href "http://apps.who.int/iris/bitstream/handle/10665/148793/9789241508209_eng.pdf" ]
                        [ text "Consulta la directriz de la OMS: Pinzamiento tardío del cordón umbilical para mejorar los resultados de salud y nutrición de la madre y el bebé" ]
                    ]
                ]
      }
    , { desc = "Esperar a que la placenta salga sola, sino TCC"
      , stage = VaginalBirth
      , icon = Placentabirth
      , id = "placenta-birth"
      , details =
            div []
                [ p []
                    [ h3 []
                        [ text """Primero esperar a que la placenta sea expulsada espontáneamente. Si se retiene la placenta
                    y se produce sangrado, se debe acelerar la extracción manual de la placenta.""" ]
                    ]
                , p []
                    [ text """Si la placenta no es expulsada espontáneamente y 
                    la tercera etapa del trabajo de parto dura más de 30 minutos, TCC y oxitocina IV/IM
                    (10 UI) deben usarse para manejar la placenta retenida. 
                    Siempre que se lleve a cabo la extracción manual de la placenta, 
                    se recomienda una sola dosis de antibióticos profilácticos."""
                    , p []
                        [ a [ href "http://apps.who.int/iris/bitstream/handle/10665/75411/9789241548502_eng.pdf?sequence=1" ]
                            [ text "Consulta las recomendaciones de la OMS para la prevención y tratamiento de hemorragia posparto" ]
                        ]
                    ]
                ]
      }
    , { desc = "Libertad de movimiento y posiciones"
      , stage = Labor
      , icon = Movement
      , id = "movement"
      , details =
            div []
                [ p [] [ h3 [] [ text """Facilitar la posición de nacimiento de la elección individual de la mujer, 
      incluida una posición de parto vertical.""" ] ]
                , p [] [ text """En la mayoría de los casos una posición no supina se percibió como más fortalecedora y menos dolorosa, 
      y para facilitar un parto más fácil.""" ]
                ]
      }
    , { desc = "Papá presente siempre y recibe al Bebé"
      , stage = Labor
      , icon = Dad
      , id = "dad-role"
      , details =
            div []
                [ p [] [ h3 [] [ text "Es muy importante que Papá también tenga un rol en el nacimiento del Bebé." ] ]
                , p [] [ text "El mayor apoyo emocional de Mamá es tener a Papá cerca y acompañándola, él también toma decisiones." ]
                ]
      }
    ]
