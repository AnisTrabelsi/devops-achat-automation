package tn.esprit.rh.achat.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tn.esprit.rh.achat.entities.Produit;
import tn.esprit.rh.achat.repositories.ProduitRepository;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

public class ProduitServiceImplTest {

  @Mock
  private ProduitRepository produitRepository;

  @InjectMocks
  private ProduitServiceImpl produitService;

  @BeforeEach
  void setup() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testRetrieveAllProduits() {
    // Given
    Produit p1 = new Produit(); p1.setIdProduit(1L);
    Produit p2 = new Produit(); p2.setIdProduit(2L);
    when(produitRepository.findAll()).thenReturn(Arrays.asList(p1, p2));

    // When
    List<Produit> result = produitService.retrieveAllProduits();

    // Then
    assertThat(result).hasSize(2);
    verify(produitRepository, times(1)).findAll();
  }

  @Test
  void testRetrieveProduitFound() {
    Produit p = new Produit(); p.setIdProduit(3L);
    when(produitRepository.findById(3L)).thenReturn(java.util.Optional.of(p));

    Produit result = produitService.retrieveProduit(3L);
    assertThat(result).isNotNull();
    assertThat(result.getIdProduit()).isEqualTo(3L);
  }

  @Test
  void testRetrieveProduitNotFound() {
    when(produitRepository.findById(99L)).thenReturn(java.util.Optional.empty());
    Produit result = produitService.retrieveProduit(99L);
    assertThat(result).isNull();
  }
}
