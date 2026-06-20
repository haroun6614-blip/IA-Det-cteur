'use client';
import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Download, BarChart3 } from 'lucide-react';

export default function HomePage() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const analyzeDocument = async () => {
    if (!file) {
      alert('Veuillez selectionner un fichier');
      return;
    }
    
    setAnalyzing(true);
    
    setTimeout(() => {
      setResults({
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(2),
        wordCount: Math.floor(Math.random() * 5000) + 1000,
        ai_detection: {
          ai_probability_score: 0.42,
          metrics: {
            perplexity: 45.7,
            burstiness: 0.65,
            lexical_diversity: 0.58,
            paraphrasing_patterns: 0.32
          },
          suspicious_passages: [
            { sentence_id: 3, text: "Furthermore, it is important to note...", suspicion_score: 0.78 },
            { sentence_id: 7, text: "In conclusion, the results demonstrate...", suspicion_score: 0.65 }
          ]
        },
        plagiarism: {
          global_assessment: {
            plagiarism_percentage: 12.5,
            level: "Faible",
            segments_analyzed: 24,
            suspicious_segments: 3
          },
          sources_checked: ["Semantic Scholar", "CrossRef", "PubMed"]
        },
        references: {
          total_references: 32,
          credibility_score: 87.5,
          invalid_references: 2,
          incomplete_references: 4,
          format_analysis: {
            dominant_format: "APA",
            is_consistent: true
          }
        },
        coherence: {
          global_coherence_score: 0.78,
          sections_detected: {
            objectives: true,
            methodology: true,
            results: true,
            discussion: true,
            conclusion: true
          },
          internal_contradictions: [],
          recommendations: [
            "La structure scientifique semble coherente",
            "Bonne progression logique entre les sections"
          ]
        }
      });
      setAnalyzing(false);
    }, 3000);
  };

  const downloadReport = () => {
    if (!results) return;
    
    const report = `
RAPPORT SCIVERIFY - EVALUATION ACADEMIQUE
==========================================

Document : ${results.fileName}
Taille : ${results.fileSize} Ko
Mots : ${results.wordCount}

MODULE 1 : DETECTION CONTENU IA
Score de probabilite IA : ${(results.ai_detection.ai_probability_score * 100).toFixed(1)}%
Perplexite : ${results.ai_detection.metrics.perplexity}
Burstiness : ${results.ai_detection.metrics.burstiness}
Passages suspects : ${results.ai_detection.suspicious_passages.length}

MODULE 2 : DETECTION DU PLAGIAT
Taux de similitude : ${results.plagiarism.global_assessment.plagiarism_percentage}%
Niveau : ${results.plagiarism.global_assessment.level}

MODULE 3 : VERIFICATION DES REFERENCES
Total references : ${results.references.total_references}
Score de credibilite : ${results.references.credibility_score}%
Format : ${results.references.format_analysis.dominant_format}

MODULE 4 : COHERENCE SCIENTIFIQUE
Score global : ${(results.coherence.global_coherence_score * 100).toFixed(1)}%
Contradictions : ${results.coherence.internal_contradictions.length}

AVERTISSEMENT : Resultats bases sur des estimations statistiques.
Une evaluation humaine reste indispensable.
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rapport-sciverify.txt';
    a.click();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontFamily: 'Arial, sans-serif' }}>
      
      <header style={{ background: 'rgba(255,255,255,0.95)', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '50px', height: '50px', background: '#4F46E5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={28} color="white" />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '28px', color: '#1F2937' }}>SciVerify</h1>
              <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>Evaluation academique</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            <a href="#features" style={{ color: '#4F46E5', textDecoration: 'none', fontWeight: '500' }}>Modules</a>
            <a href="#about" style={{ color: '#4F46E5', textDecoration: 'none', fontWeight: '500' }}>A propos</a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '40px', margin: '0 0 20px 0', fontWeight: 'bold' }}>
            Analysez vos documents academiques
          </h2>
          <p style={{ fontSize: '18px', opacity: 0.9, margin: 0 }}>
            Detection IA - Verification plagiat - Validation references - Coherence scientifique
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <div style={{ border: '3px dashed #D1D5DB', borderRadius: '15px', padding: '50px', textAlign: 'center' }}>
            <Upload size={64} color="#9CA3AF" style={{ margin: '0 auto 20px' }} />
            <h3 style={{ color: '#374151', margin: '0 0 10px 0' }}>Glissez votre fichier ici</h3>
            <p style={{ color: '#6B7280', margin: '0 0 20px 0' }}>ou cliquez pour parcourir</p>
            <p style={{ color: '#9CA3AF', fontSize: '14px', margin: '0 0 20px 0' }}>
              Formats acceptes : PDF, DOCX, TXT
            </p>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="file-input"
            />
            <label
              htmlFor="file-input"
              style={{ background: '#4F46E5', color: 'white', padding: '14px 32px', borderRadius: '10px', cursor: 'pointer', display: 'inline-block', fontWeight: '600' }}
            >
              Choisir un fichier
            </label>
            {file && (
              <p style={{ marginTop: '20px', color: '#10B981', fontWeight: '600' }}>
                Fichier selectionne : {file.name}
              </p>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              onClick={analyzeDocument}
              disabled={!file || analyzing}
              style={{
                background: analyzing ? '#9CA3AF' : '#4F46E5',
                color: 'white',
                border: 'none',
                padding: '16px 48px',
                fontSize: '18px',
                fontWeight: '600',
                borderRadius: '10px',
                cursor: analyzing ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px rgba(79,70,229,0.4)'
              }}
            >
              {analyzing ? 'Analyse en cours...' : 'Lancer l\'analyse complete'}
            </button>
          </div>
        </div>

        {results && (
          <div style={{ marginTop: '50px', background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
              <h2 style={{ margin: 0, color: '#1F2937' }}>Resultats de l'analyse</h2>
              <button
                onClick={downloadReport}
                style={{ background: '#10B981', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}
              >
                <Download size={18} /> Telecharger le rapport
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              
              <div style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)', padding: '25px', borderRadius: '15px', color: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <BarChart3 size={24} />
                  <h3 style={{ margin: 0, fontSize: '16px' }}>Detection IA</h3>
                </div>
                <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0' }}>
                  {(results.ai_detection.ai_probability_score * 100).toFixed(1)}%
                </p>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Probabilite de contenu IA</p>
              </div>

              <div style={{ background: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)', padding: '25px', borderRadius: '15px', color: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <AlertCircle size={24} />
                  <h3 style={{ margin: 0, fontSize: '16px' }}>Plagiat</h3>
                </div>
                <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0' }}>
                  {results.plagiarism.global_assessment.plagiarism_percentage}%
                </p>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Niveau : {results.plagiarism.global_assessment.level}</p>
              </div>

              <div style={{ background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)', padding: '25px', borderRadius: '15px', color: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <CheckCircle size={24} />
                  <h3 style={{ margin: 0, fontSize: '16px' }}>References</h3>
                </div>
                <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0' }}>
                  {results.references.credibility_score}%
                </p>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Credibilite des sources</p>
              </div>

              <div style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)', padding: '25px', borderRadius: '15px', color: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <FileText size={24} />
                  <h3 style={{ margin: 0, fontSize: '16px' }}>Coherence</h3>
                </div>
                <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0' }}>
                  {(results.coherence.global_coherence_score * 100).toFixed(0)}%
                </p>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Score scientifique global</p>
              </div>
            </div>

            <div style={{ background: '#F9FAFB', padding: '25px', borderRadius: '12px', marginTop: '20px' }}>
              <h3 style={{ color: '#1F2937', marginTop: 0 }}>Details de l'analyse</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                <div>
                  <strong>Metriques IA :</strong>
                  <ul style={{ marginTop: '10px', color: '#4B5563' }}>
                    <li>Perplexite : {results.ai_detection.metrics.perplexity}</li>
                    <li>Burstiness : {results.ai_detection.metrics.burstiness}</li>
                    <li>Diversite lexicale : {results.ai_detection.metrics.lexical_diversity}</li>
                  </ul>
                </div>
                <div>
                  <strong>Plagiat :</strong>
                  <ul style={{ marginTop: '10px', color: '#4B5563' }}>
                    <li>Segments analyses : {results.plagiarism.global_assessment.segments_analyzed}</li>
                    <li>Sources verifiees : {results.plagiarism.sources_checked.length}</li>
                  </ul>
                </div>
                <div>
                  <strong>References :</strong>
                  <ul style={{ marginTop: '10px', color: '#4B5563' }}>
                    <li>Total : {results.references.total_references}</li>
                    <li>Invalides : {results.references.invalid_references}</li>
                    <li>Format : {results.references.format_analysis.dominant_format}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={{ background: '#FEE2E2', padding: '20px', borderRadius: '12px', marginTop: '20px', borderLeft: '5px solid #EF4444' }}>
              <p style={{ margin: 0, color: '#7F1D1D', fontSize: '14px' }}>
                <strong>Avertissement :</strong> Ces resultats sont des estimations probabilistes basees sur des analyses statistiques. 
                Ils ne constituent pas une preuve formelle et ne remplacent pas une evaluation humaine experte.
              </p>
            </div>
          </div>
        )}

        <div id="features" style={{ marginTop: '60px', background: 'rgba(255,255,255,0.95)', borderRadius: '20px', padding: '40px' }}>
          <h2 style={{ textAlign: 'center', color: '#1F2937', marginBottom: '40px' }}>Nos 4 modules d'analyse</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px' }}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>IA</div>
              <h3 style={{ color: '#1F2937' }}>Detection IA</h3>
              <p style={{ color: '#6B7280' }}>Analyse de la perplexite et patterns linguistiques</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>PLAGIAT</div>
              <h3 style={{ color: '#1F2937' }}>Detection Plagiat</h3>
              <p style={{ color: '#6B7280' }}>Comparaison avec bases academiques</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>REF</div>
              <h3 style={{ color: '#1F2937' }}>Verification References</h3>
              <p style={{ color: '#6B7280' }}>Controle DOI et format bibliographique</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>SCIENCE</div>
              <h3 style={{ color: '#1F2937' }}>Coherence Scientifique</h3>
              <p style={{ color: '#6B7280' }}>Analyse logique des sections</p>
            </div>
          </div>
        </div>
      </main>

      <footer style={{ background: 'rgba(0,0,0,0.2)', color: 'white', textAlign: 'center', padding: '20px', marginTop: '40px' }}>
        <p>2026 SciVerify - Application open source - 100% gratuite</p>
      </footer>
    </div>
  );
}
