<?php
function console_log($data, $context = 'Debug in Console') {
    ob_start();

    $output  = 'console.info(\'' . $context . ':\');';
    $output .= 'console.log(' . json_encode($data) . ');';
    $output  = sprintf('<script>%s</script>', $output);

    echo $output;
}
?>

