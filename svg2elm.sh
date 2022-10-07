-- https://github.com/pinata-llc/svg2elm

echo 'Iniciando traductor de svg a elm'ç
svg2elm --module Assets.Icons ./icons/*.svg > ./src/Assets/Icons.elm
