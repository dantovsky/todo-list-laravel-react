import subprocess
import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules
from mlxtend.preprocessing import TransactionEncoder

def get_git_commit_files():
    """Obtém a lista de arquivos modificados por commit usando git log."""
    result = subprocess.run(
        ["git", "log", "--name-only", "--pretty=format:'COMMIT'"],
        capture_output=True,
        text=True
    )
    
    commits = []
    current_commit = []
    
    for line in result.stdout.split('\n'):
        line = line.strip()
        if line == "'COMMIT'":
            if current_commit:
                commits.append(current_commit)
                current_commit = []
        elif line:
            current_commit.append(line)
    
    if current_commit:
        commits.append(current_commit)
    
    return commits

def analyze_frequent_patterns(transactions, min_support=0.1, min_confidence=0.5):
    """Aplica Apriori para encontrar padrões frequentes de arquivos modificados juntos."""
    te = TransactionEncoder()
    te_ary = te.fit(transactions).transform(transactions)
    df = pd.DataFrame(te_ary, columns=te.columns_)
    
    # Aplicar Apriori
    frequent_itemsets = apriori(df, min_support=min_support, use_colnames=True)
    
    # Regras de associação
    rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=min_confidence)
    
    return frequent_itemsets, rules

if __name__ == "__main__":
    print("Extraindo dados do Git...")
    transactions = get_git_commit_files()
    
    print(f"Total de commits analisados: {len(transactions)}")
    
    print("Executando mineração de padrões...")
    frequent_itemsets, rules = analyze_frequent_patterns(transactions)
    
    print("Padrões Frequentes:")
    print(frequent_itemsets)
    
    print("Regras de Associação:")
    print(rules)