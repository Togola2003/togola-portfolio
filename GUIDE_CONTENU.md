# Guide — Modifier le contenu de mon portfolio

Ce guide explique comment ajouter, modifier ou supprimer du contenu
**sans toucher au code**. Il suffit d'éditer des fichiers JSON simples.

---

## Fichiers à modifier

| Ce que tu veux changer | Fichier à éditer |
|---|---|
| Compétences (skills) | `public/content/skills.json` |
| Projets (titres, descriptions) | `public/content/projects.json` |
| Images des projets | `public/images/projects/` + `projects.json` |

---

## Ajouter / supprimer une compétence

Ouvre **`public/content/skills.json`**.

La structure est simple :
```json
{
  "fr": {
    "groups": [
      {
        "title": "CAO / DAO",
        "items": ["FreeCAD (intermédiaire)", "AutoCAD (intermédiaire)"]
      }
    ]
  },
  "en": {
    "groups": [
      {
        "title": "CAD / DAO",
        "items": ["FreeCAD (intermediate)", "AutoCAD (intermediate)"]
      }
    ]
  }
}
```

### Ajouter une compétence dans un groupe existant
Ajoute simplement une entrée dans le tableau `items` :
```json
"items": ["FreeCAD (intermédiaire)", "AutoCAD (intermédiaire)", "SolidWorks (débutant)"]
```
N'oublie pas de faire la même chose dans la section `"en"`.

### Ajouter un nouveau groupe de compétences
Ajoute un objet dans `groups` :
```json
{
  "title": "Langues",
  "items": ["Français (natif)", "Anglais (B1)", "Bambara (natif)"]
}
```
Fais pareil dans `"en"` avec le titre traduit.

### Supprimer une compétence
Supprime simplement la ligne correspondante dans `items`.

---

## Ajouter un nouveau projet

Ouvre **`public/content/projects.json`**.

Ajoute un objet dans le tableau `"fr"` ET dans `"en"` :

```json
{
  "slug": "mon-nouveau-projet",
  "title": "Titre du projet",
  "period": "2026",
  "tagline": "Une phrase courte décrivant le projet",
  "bullets": [
    "Ce que j'ai fait en premier",
    "Ce que j'ai fait ensuite",
    "Résultat obtenu"
  ],
  "stack": ["Outil1", "Outil2", "Outil3"],
  "tags": ["Robotique", "Embarqué"],
  "images": []
}
```

**Règles importantes :**
- `slug` : identifiant unique, sans espaces ni accents (ex: `projet-bras-robot`)
- `tags` : utilisés pour les filtres → utilise des tags déjà existants pour regrouper avec les autres projets
- `images` : laisse `[]` si tu n'as pas encore d'images

**Tags disponibles :**
`Robotique` `Embarqué` `CAO` `Dev` `IA` `Startup` `Mécanique` `Électrique` `IoT` `Système`

---

## Ajouter des images à un projet

### Étape 1 — Mettre l'image dans le bon dossier
Place tes fichiers image dans :
```
public/images/projects/
```
Nomme-les clairement, par exemple :
- `robot-desinfecteur-1.jpg`
- `robot-desinfecteur-2.jpg`

**Formats acceptés :** JPG, PNG, WebP
**Taille recommandée :** 1200×800 px minimum, moins de 2 Mo par image

### Étape 2 — Référencer les images dans projects.json
Dans **`public/content/projects.json`**, modifie le champ `images` du projet :
```json
"images": [
  "images/projects/robot-desinfecteur-1.jpg",
  "images/projects/robot-desinfecteur-2.jpg"
]
```
Fais la même modification dans `"fr"` ET `"en"` (même chemin d'image).

La première image apparaît sur la carte du projet.
Toutes les images s'affichent dans la modale quand on clique sur le projet.

### Supprimer une image
Supprime simplement la ligne correspondante dans le tableau `images`.
Tu peux aussi supprimer le fichier image du dossier `public/images/projects/`.

---

## Après chaque modification

1. Sauvegarde le fichier JSON (Ctrl+S)
2. Si le site est en local : il se met à jour automatiquement
3. Si le site est en ligne (Vercel) : fais un `git commit` + `git push` pour déployer

---

## Choses qui NE changent pas avec ces fichiers

Pour modifier ces éléments, il faut parler à un développeur (ou à Claude) :
- Ton nom, titre, texte "Mon mindset"
- Tes expériences professionnelles
- Ta formation
- Tes informations de contact (email, téléphone, LinkedIn)
- Le design et les couleurs du site

Ces infos sont dans `src/content/site.fr.ts` et `src/content/site.en.ts`.
