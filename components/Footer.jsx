export default function Footer() {
  return (
    <footer className="bg-navbar-bg py-10 border-t border-cyan-muted/20">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          
          {/* Column 1: Navigation */}
          <div>
            <h3 className="text-cyan-bright font-bold mb-4 text-lg">Explore Eras</h3>
            <ul className="space-y-2 text-text-secondary">
              <li>
                <a 
                  href="/foundation" 
                  className="hover:text-cyan-bright transition-colors duration-200 flex items-center gap-2"
                >
                  <span>→</span> Foundation Era (1991-2004)
                </a>
              </li>
              <li>
                <a 
                  href="/wireless" 
                  className="hover:text-cyan-bright transition-colors duration-200 flex items-center gap-2"
                >
                  <span>→</span> Wireless Era (2005-2013)
                </a>
              </li>
              <li>
                <a 
                  href="/smart-nation" 
                  className="hover:text-cyan-bright transition-colors duration-200 flex items-center gap-2"
                >
                  <span>→</span> Smart Nation (2013-Present)
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 2: Data Sources */}
          <div>
            <h3 className="text-cyan-bright font-bold mb-4 text-lg">Data Sources</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li>
                <a 
                  href="https://data.gov.sg/datasets/d_3f4bfee2d42f8fb3bea3218c01aa9902/view" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-bright hover:underline transition-colors duration-200"
                >
                  Data.gov.sg - Internet Usage by Age
                </a>
              </li>
              <li>
                <a 
                  href="https://data.gov.sg/datasets/d_fcc02bc884c54a09e8665443bff2f4c2/view" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-bright hover:underline transition-colors duration-200"
                >
                  Data.gov.sg - Individual Internet Usage
                </a>
              </li>
              <li>
                <a 
                  href="https://data.worldbank.org/indicator/IT.NET.USER.ZS" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-bright hover:underline transition-colors duration-200"
                >
                  World Bank Open Data
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: About */}
          <div>
            <h3 className="text-cyan-bright font-bold mb-4 text-lg">About This Project</h3>
            <p className="text-text-secondary text-sm mb-4 leading-relaxed">
              An interactive exploration of Singapore's remarkable digital transformation 
              from its humble beginnings in 1991 to becoming one of the world's most 
              connected Smart Nations.
            </p>
            <div className="text-xs text-text-secondary/80 space-y-1">
              <p>CM1040 Web Development</p>
              <p>University of London</p>
              <p className="flex items-center gap-1">
                Built with <span className="text-red-500">❤️</span> by Manish
              </p>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Copyright Bar */}
        <div className="border-t border-cyan-muted/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-text-secondary text-xs">
            <p>© 2026 Manish. All data used for educational purposes only.</p>
            <p>All rights remain with original sources.</p>
          </div>
        </div>
        
      </div>
    </footer>
  );
}