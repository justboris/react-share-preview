<?php

namespace Drupal\react_share_preview\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Url;
use Drupal\node\Entity\Node;
use Drupal\file\Entity;
use Drupal\image\Entity\ImageStyle;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Provides a 'Share' Block.
 *
 * @Block(
 *   id = "share_social_block",
 *   admin_label = @Translation("Share Social"),
 *   category = @Translation("Custom"),
 * )
 */
class ShareBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $nodeid = 0;
    $node = \Drupal::request()->attributes->get('node');
    if ($node = \Drupal::request()->attributes->get('node')) {
      $nodeid = $node->id();
    }

    $host = \Drupal::request()->getSchemeAndHttpHost();
    $current_url = Url::fromRoute('entity.node.canonical', ['node' => $nodeid])->toString();    
    $whole_url = $host_url . $current_url;

    // Create array of requisite field values and format a vCard.
    $node_fields = array(
      'title',
      'field_intro',
      'field_image'
    );
    $node_data = array();
    foreach ($node_fields as $field_name) {
      if ($node->get($field_name)->getValue() != null) {        
        if ($field_name == 'field_image'){
          if (isset($node->get($field_name)->entity)) {
            // Rectangular Teaser Image
            // To do: provide social media specific image size.
            $image_style = 'social_share';
            $style = ImageStyle::load($image_style);

            // Get original image. Asking for entity will return the first one automatically.
            $media_entity =  $node->field_image->entity;
            $img_entity = $media_entity->get('field_image')->first();
            $file_entity = $img_entity->get('entity')->getTarget();

            $file_uri = $file_entity->get('uri')->first()->getString();
            $derived_file_uri = $style->buildUri($file_uri);

            // Drupal specific stored image path
            $cleanup_url = str_replace('public://', '/sites/default/files/', $derived_file_uri); // Generate file url for the derived image.

            $node_data['field_image'] = $cleanup_url;
          } else {
            $node_data[$field_name] = 'This image is not found';
          }
        } else {
          $node_data[$field_name] = $node->get($field_name)->getString();
        }
      }
    }

    return [
      // Generate a place for React components to display
      '#markup' => '<div id="nowShare"></div>',
      '#attached' => [
        'library' => [
          'react_share_preview/react',
          'react_share_preview/share'
        ],
        'drupalSettings' => [
          'reactNID' => $nodeid,
          'currentURL' => $whole_url,
          'reactTitle' => $node_data['title'],
          'reactIntro' => $node_data['field_intro'],
          'reactImage' => $node_data['field_image']
        ]
      ],
    ];
  }
  // full flush all the cache so the same content won't be carried over to other pages.
  public function getCacheMaxAge() {
      return 0;
  }

}
