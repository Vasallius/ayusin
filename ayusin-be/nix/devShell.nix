{
  pkgs,
  extras,
}:
with pkgs;
mkShell {
  name = "ayusin-web/ayusin-be";

  nativeBuildInputs = [
    extras.pkgs-unstable.bun # ^1.2.22, may change based on nixpkgs/unstable
    vtsls
    biome
    mongosh
  ];

}
