package tn.esprit.rh.achat.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.rh.achat.entities.Produit;
import tn.esprit.rh.achat.entities.Stock;
import tn.esprit.rh.achat.repositories.CategorieProduitRepository;
import tn.esprit.rh.achat.repositories.ProduitRepository;
import tn.esprit.rh.achat.repositories.StockRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Slf4j
public class ProduitServiceImpl implements IProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private CategorieProduitRepository categorieProduitRepository;

    @Autowired
    private StockRepository stockRepository;

    @Override
    public List<Produit> retrieveAllProduits() {
        log.info("Récupération de tous les produits");
        List<Produit> produits = produitRepository.findAll();
        log.info("Nombre de produits récupérés : {}", produits.size());
        return produits;
    }

    @Override
    public Produit retrieveProduit(Long id) {
        log.info("Récupération du produit avec l'ID : {}", id);
        return produitRepository.findById(id)
                .orElse(null);
    }

    @Override
    @Transactional
    public Produit addProduit(Produit produit) {
        log.info("Ajout d'un nouveau produit : {}", produit);
        Produit saved = produitRepository.save(produit);
        log.info("Produit ajouté avec l'ID : {}", saved.getIdProduit());
        return saved;
    }

    @Override
    public void deleteProduit(Long id) {
        log.info("Suppression du produit avec l'ID : {}", id);
        produitRepository.deleteById(id);
        log.info("Produit {} supprimé", id);
    }

    @Override
    public Produit updateProduit(Produit produit) {
        log.info("Mise à jour du produit : {}", produit);
        Produit updated = produitRepository.save(produit);
        log.info("Produit mis à jour avec l'ID : {}", updated.getIdProduit());
        return updated;
    }

    @Override
    public void assignProduitToStock(Long idProduit, Long idStock) {
        log.info("Début de l'affectation du produit {} au stock {}", idProduit, idStock);
        Produit produit = produitRepository.findById(idProduit).orElse(null);
        Stock stock = stockRepository.findById(idStock).orElse(null);
        if (produit != null && stock != null) {
            produit.setStock(stock);
            produitRepository.save(produit);
            log.info("Produit {} affecté au stock {} avec succès", idProduit, idStock);
        } else {
            log.error("Erreur d'affectation : produit ou stock introuvable (Produit={}, Stock={})", idProduit, idStock);
        }
    }
}
