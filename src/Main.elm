port module Main exposing (Model, main)

import Browser
import Css exposing (..)
import Css.Media exposing (withMedia)
import Data.Notes exposing (PlanNotes)
import Data.Preferences exposing (Preference, Stage(..))
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, id, name, src)
import Html.Styled.Events exposing (onClick)
import Icon exposing (icon)
import Json.Decode
import Svg.Attributes


port toggleDialog : String -> Cmd msg


main =
    Browser.element
        { init = init
        , view = view >> toUnstyled
        , update = update
        , subscriptions = \_ -> Sub.none
        }


type alias Model =
    { preferences : List (Preference Msg)
    , notes : PlanNotes
    }


initialModel : Model
initialModel =
    Model Data.Preferences.myPreferences Data.Notes.myNotes


init : () -> ( Model, Cmd Msg )
init =
    \_ ->
        ( initialModel, Cmd.none )


type Msg
    = ToggleDialog String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ToggleDialog id ->
            ( model, toggleDialog id )


view : Model -> Html Msg
view model =
    div
        [ css
            [ backgroundColor (hex "white")
            , maxWidth (px 1000)
            , property "margin" "auto"
            ]
        ]
        [ titleView model, preferencesView model, notesView model ]


notesView : Model -> Html Msg
notesView model =
    div
        [ css
            [ property "line-height" "1.5" ]
        ]
        [ p [] []
        , div []
            (text
                "NOTAS SOBRE LABOR"
                :: List.map (\x -> div [] [ text "- ", text x ]) model.notes.labor
            )
        , p [] []
        , div []
            (text "NOTAS SOBRE PARTO"
                :: List.map (\x -> div [] [ text "- ", text x ]) model.notes.birth
            )
        , p [] []
        , div []
            (text "NOTAS SOBRE POSPARTO"
                :: List.map (\x -> div [] [ text "- ", text x ]) model.notes.postpartum
            )
        , p [] []
        ]


titleView : Model -> Html Msg
titleView string =
    div
        [ css
            [ textAlign center
            , property "line-height" "1.5"
            ]
        ]
        [ h1 [] [ div [] [ text "Parto vaginal natural humanizado" ], div [] [ text "Mamá Lyann & Papá Emilio" ] ] ]


preferenceView : Int -> Preference Msg -> Html Msg
preferenceView index preference =
    let
        isEven =
            modBy 2 index == 0

        ( bgColor, textColor ) =
            case ( preference.stage, isEven ) of
                ( Data.Preferences.Labor, True ) ->
                    ( "#ffeaee", "#2e5266" )

                ( Labor, False ) ->
                    ( "#2e5266", "#ffeaee" )

                ( VaginalBirth, True ) ->
                    ( "#fffae3", "#998DA0" )

                ( VaginalBirth, False ) ->
                    ( "#998DA0", "#fffae3" )

                ( Postpartum, True ) ->
                    ( "#f1ffe7", "#463F1A" )

                ( Postpartum, False ) ->
                    ( "#463F1A", "#f1ffe7" )
    in
    div
        [ css
            [ backgroundColor (hex bgColor)
            , color (hex textColor)
            , textAlign center
            , padding (px 12)
            , displayFlex
            , flexDirection column
            , alignItems center
            , property "justifySelf" "stretch"

            -- , maxWidth (px 300)
            ]
        , onClick (ToggleDialog preference.id)
        ]
        [ div
            []
            [ icon preference.icon [ Svg.Attributes.fill "blue", Svg.Attributes.width "150px", Svg.Attributes.height "150px", Svg.Attributes.fill textColor ] ]
        , div [] [ text preference.desc ]
        , dialog preference.id
            [ h2 [] [ text preference.desc ]
            , preference.details
            , button [ Html.Styled.Events.stopPropagationOn "click" (Json.Decode.succeed ( ToggleDialog preference.id, True )) ] [ text "Close dialog" ]
            ]
        ]


dialog : String -> List (Html msg) -> Html msg
dialog dialogId content =
    node "dialog" [ id dialogId ] content


preferencesView : Model -> Html Msg
preferencesView { preferences } =
    let
        laborPrefs =
            List.filter (\{ stage } -> stage == Labor) preferences

        vaginalBirthPrefs =
            List.filter (\y -> y.stage == VaginalBirth) preferences

        postpartumPrefs =
            List.filter (\z -> z.stage == Postpartum) preferences
    in
    div
        [ css
            [ property "display" "grid"
            , property "grid-template-columns" "minmax(min(100%, 300px), 300px)"
            , property "grid-row-gap" "25px"
            , property "grid-column-gap" "15px"
            , property "justify-content" "center"

            --, withMedia [ Css.Media.all [ Css.Media.minWidth (px 100) ] ] [ property "grid-template-columns" "repeat(6,1fr)" ]
            ]
        ]
        (div
            [ css [ property "align-self" "center", property "justify-items" "center", property "display" "grid" ] ]
            [ h3 [] [ text "Labor" ] ]
            :: List.indexedMap preferenceView laborPrefs
            ++ div
                [ css [ property "align-self" "center", property "justify-items" "center", property "display" "grid" ] ]
                [ h3 [] [ text "Parto" ] ]
            :: List.indexedMap preferenceView vaginalBirthPrefs
            ++ div
                [ css [ property "align-self" "center", property "justify-items" "center", property "display" "grid" ] ]
                [ h3 [] [ text "Posparto" ] ]
            :: List.indexedMap preferenceView postpartumPrefs
        )
