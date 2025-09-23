{
  description = "Ayusin.ph Web Backend";

  outputs =
    { nixpkgs-stable, systems, ... }@inputs:
    builtins.foldl' (a: b: a // b) { } (
      builtins.map (
        system:
        let
          pkgs = nixpkgs-stable.legacyPackages.${system};
          extras = {
            pkgs-unstable = inputs.nixpkgs-unstable.legacyPackages.${system};
          };
        in
        {
          devShells.${system}.default = import ./nix/devShell.nix { inherit pkgs extras; };
        }
      ) (import systems)
    );

  inputs = {
    nixpkgs-stable.url = "github:nixos/nixpkgs/nixos-25.05";
    nixpkgs-unstable.url = "github:nixos/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
  };
}
