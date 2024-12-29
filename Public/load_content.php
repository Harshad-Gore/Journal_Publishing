<?php
$content = '';

if (isset($_GET['tab'])) {
    $tab = $_GET['tab'];

    switch ($tab) {
        case 'about':
            $content = '<h4 class="mb-4"><b>About Journal</b></h4>
                        <p style="text-align: justify;"><strong>Journal Of Computational Innovations</strong> is an open
                        access peer-reviewed journal from the publishers of BuildSoft. The journal focuses to build up accessing the complete content of articles freely from online for reader&rsquo;s perusal.</p>
                        <p style="text-align: justify;">Article acceptance will be in the form of Research Articles, Review Articles, Mini Reviews, Case Reports, Short Communications, Opinion Articles, Image Articles, Prospective Articles, Analysis, Magazines, Editorials, Video Articles, and Power Point Presentations (PPTS).</p>
                        <p style="text-align: justify;">All published articles are permanently archived and available on BuildSoft Publishers website in PDF formats.</p>
                        <p style="text-align: justify;">Articles can be submitted through online from at <a href="/Public/index.html">BuildSoft Publishers Website</a> or E-mail: <a href="mailto:buildsofttech2019@gmail.com">buildsofttech2019@gmail.com</a></p>';
            break;
        case 'aims':
            $content = '<h4 class="mb-4"><b>Aims and Scope</b></h4>
                        <p style="text-align: justify;">The Journal of Computational Innovations aims to publish high-quality research articles in the field of computational methods, artificial intelligence, and innovative algorithms. The scope includes but is not limited to:</p>
                        <ul>
                            <li>Advanced computational techniques</li>
                            <li>Artificial intelligence and machine learning</li>
                            <li>Innovative algorithms and their applications</li>
                            <li>Data science and big data analytics</li>
                            <li>Computational biology and bioinformatics</li>
                        </ul>';
            break;
        // Add more cases for other tabs
    }
}

echo $content;
?>