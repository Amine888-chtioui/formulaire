//  Nom: Chtioui
//  Prénom: Mohamed Amine
//  Groupe: G1
//  Module: Technologies Web

<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('Acces direct interdit.');
}

$nom         = htmlspecialchars(trim($_POST['nom']            ?? ''));
$email       = htmlspecialchars(trim($_POST['email']          ?? ''));
$code        = htmlspecialchars(trim($_POST['code']           ?? ''));
$age         = htmlspecialchars(trim($_POST['age']            ?? ''));
$lieu        = htmlspecialchars(trim($_POST['lieu_naissance'] ?? ''));
$date        = htmlspecialchars(trim($_POST['date']           ?? ''));
$niveau      = htmlspecialchars(trim($_POST['niveau']         ?? ''));
$satisfaction = htmlspecialchars(trim($_POST['satisfaction']  ?? ''));
$commentaire = htmlspecialchars(trim($_POST['commentaires']   ?? ''));
$module      = htmlspecialchars(trim($_POST['module']         ?? 'IA'));

$contenu = $_POST['contenu'] ?? [];
$contenu = array_map('htmlspecialchars', $contenu);
$contenuAffiche = !empty($contenu) ? implode(', ', $contenu) : 'Aucun';

$dateFr = '';
if ($date) {
    $dateObj = DateTime::createFromFormat('Y-m-d', $date);
    $dateFr = $dateObj ? $dateObj->format('d/m/Y') : $date;
}

$satisfactionLabels = [
    '1' => 'Très insatisfaisant',
    '2' => 'Insatisfaisant',
    '3' => 'Moyen',
    '4' => 'Satisfaisant',
    '5' => 'Très satisfaisant',
];
$satisfactionLibelle = $satisfactionLabels[$satisfaction] ?? 'Non renseigné';
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Résultat du formulaire</title>
  <link rel="stylesheet" type="text/css" href="style.css" />
</head>
<body>

<div class="fiche">

  <h1>Fiche de Réponse</h1>
  <p class="sous-titre">Module : <?= $module ?> — Soumis le <?= date('d/m/Y à H:i') ?></p>


  <h2>Informations personnelles</h2>
  <table>
    <tr><td>Nom</td><td><?= $nom ?: 'Non renseigné' ?></td></tr>
    <tr><td>Email</td><td><?= $email ?: 'Non renseigné' ?></td></tr>
    <tr><td>Code étudiant</td><td><?= $code ?: 'Non renseigné' ?></td></tr>
    <tr><td>Âge</td><td><?= $age ?: 'Non renseigné' ?></td></tr>
    <tr><td>Lieu de naissance</td><td><?= $lieu ?: 'Non renseigné' ?></td></tr>
    <tr><td>Date de remplissage</td><td><?= $dateFr ?: 'Non renseigné' ?></td></tr>
  </table>


  <h2>Informations scolaires</h2>
  <table>
    <tr><td>Niveau d'étude</td><td><?= $niveau ?: 'Non renseigné' ?></td></tr>
    <tr><td>Contenus appréciés</td><td><?= $contenuAffiche ?></td></tr>
    <tr><td>Satisfaction globale</td><td><?= $satisfactionLibelle ?></td></tr>
  </table>

  <h2>Informations supplémentaires</h2>
  <table>
    <tr><td>Commentaires</td><td><?= $commentaire ?: 'Non renseigné' ?></td></tr>
  </table>

  <a href="formulaire.html" class="btn-retour">← Retour au formulaire</a>
  <button class="btn-imprimer" id="btnImprimer">🖨 Imprimer</button>

</div>

<script>
  document.getElementById('btnImprimer').addEventListener('click', function() {
    window.print();
  });
</script>

</body>
</html>