module Icon exposing (..)

import Assets.Icons
import Svg
import Svg.Styled


type Icon
    = Noun
    | Food
    | Vagexam
    | Iv
    | Waitpush
    | Movement
    | Dad
    | Placentabirth
    | Suctioning
    | Cord
    | Kristeller
    | Skintoskin
    | Breastfeeding
    | Bath
    | Drugs
    | Cosleep


icon : Icon -> List (Svg.Attribute msg) -> Svg.Styled.Svg msg
icon iconName attrs =
    case iconName of
        Noun ->
            Svg.Styled.fromUnstyled (Assets.Icons.noun attrs)

        Food ->
            Svg.Styled.fromUnstyled (Assets.Icons.food attrs)

        Vagexam ->
            Svg.Styled.fromUnstyled (Assets.Icons.vagexam attrs)

        Iv ->
            Svg.Styled.fromUnstyled (Assets.Icons.iv attrs)

        Waitpush ->
            Svg.Styled.fromUnstyled (Assets.Icons.waitpush attrs)

        Movement ->
            Svg.Styled.fromUnstyled (Assets.Icons.movement attrs)

        Dad ->
            Svg.Styled.fromUnstyled (Assets.Icons.dad attrs)

        Placentabirth ->
            Svg.Styled.fromUnstyled (Assets.Icons.placentabirth attrs)

        Suctioning ->
            Svg.Styled.fromUnstyled (Assets.Icons.suctioning attrs)

        Cord ->
            Svg.Styled.fromUnstyled (Assets.Icons.cord attrs)

        Kristeller ->
            Svg.Styled.fromUnstyled (Assets.Icons.kristeller attrs)

        Skintoskin ->
            Svg.Styled.fromUnstyled (Assets.Icons.skintoskin attrs)

        Breastfeeding ->
            Svg.Styled.fromUnstyled (Assets.Icons.breastfeeding attrs)

        Bath ->
            Svg.Styled.fromUnstyled (Assets.Icons.bath attrs)

        Drugs ->
            Svg.Styled.fromUnstyled (Assets.Icons.drugs attrs)

        Cosleep ->
            Svg.Styled.fromUnstyled (Assets.Icons.cosleep attrs)
