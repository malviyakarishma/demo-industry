"use client";
import styles from "../styles/AcrossTheWorld.module.css";
import { useEffect, useRef, useState } from "react";
import { geoMercator, GeoProjection } from "d3-geo";

const geoUrl = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

// Default dimensions for SSR consistency
const DEFAULT_DIMENSIONS = { width: 1600, height: 600 };

// Responsive dimensions - only called on client side
const getMapDimensions = () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  
  if (screenWidth < 480) {
    // Small mobile devices
    return { 
      width: Math.min(screenWidth - 20, 350), 
      height: Math.min(screenHeight * 0.4, 300) 
    };
  } else if (screenWidth < 768) {
    // Mobile devices
    return { 
      width: Math.min(screenWidth - 30, 500), 
      height: Math.min(screenHeight * 0.45, 350) 
    };
  } else if (screenWidth < 1024) {
    // Tablet
    return { width: 800, height: 500 };
  } else {
    // Desktop
    return { width: 1600, height: 600 };
  }
};

// List of countries that should be interactive
const interactiveCountries = [
  "United States of America",
  "Canada",
  "India",
  "China",
  "United Arab Emirates"
];

// Types
type GeoJsonFeature = {
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: any;
  };
  properties?: {
    name?: string;
  };
};
type Ring = [number, number][];
type Polygon = Ring[];
type GeoJson = { features: GeoJsonFeature[] };

export default function AcrossTheWorld() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [mapDimensions, setMapDimensions] = useState(DEFAULT_DIMENSIONS);

  // Set initial dimensions and handle window resize
  useEffect(() => {
    // Set initial dimensions after component mounts
    setMapDimensions(getMapDimensions());
    
    const handleResize = () => {
      setMapDimensions(getMapDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // d3-geo Mercator projection centered on the world
    const projection: GeoProjection = geoMercator()
      .center([0, 16.2]) // Center on world, latitude 16.2 (10% lower from 18)
      .scale((mapDimensions.width / 2 / Math.PI) * 0.8) // Zoomed out more to show entire world map
      .translate([mapDimensions.width / 2, mapDimensions.height / 2]);

    let isMounted = true;

    fetch(geoUrl)
      .then((res) => res.json())
      .then((geojson: GeoJson) => {
        if (!svgRef.current || !isMounted) return;
        
        // Clear existing content safely
        try {
          svgRef.current.innerHTML = "";
        } catch (error) {
          console.warn("Error clearing SVG:", error);
        }
        
        // Add a group for tooltips and markers
        const tooltipGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        tooltipGroup.setAttribute("id", "tooltip-group");
        if (svgRef.current) {
          svgRef.current.appendChild(tooltipGroup);
        }
        
        geojson.features.forEach((feature: GeoJsonFeature, index: number) => {
          if (!isMounted) return;
          
          const countryName = feature.properties?.name || `Country ${index}`;
          const isInteractive = interactiveCountries.includes(countryName);
          
          if (feature.geometry.type === "Polygon") {
            const d = (feature.geometry.coordinates as Polygon)
              .map((ring: Ring) =>
                (ring as [number, number][])
                  .map(([lon, lat]: [number, number], i: number) => {
                    const [x, y] = projection([lon, lat])!;
                    return `${i === 0 ? "M" : "L"}${x},${y}`;
                  })
                  .join(" ") + "Z"
              )
              .join(" ");
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", d);
            path.setAttribute("fill", isInteractive ? "#ef4444" : "#e5e7eb");
            path.setAttribute("stroke", "#000000");
            path.setAttribute("stroke-width", "0.525");
            path.setAttribute("data-country", countryName);
            
            if (isInteractive) {
              path.setAttribute("cursor", "pointer");
              
              // Add hover effects for mouse
              path.addEventListener("mouseenter", (e) => {
                if (!isMounted) return;
                path.setAttribute("filter", "drop-shadow(0 0 4px #ef4444)");
                path.setAttribute("stroke-width", "0.84");
                setHoveredCountry(countryName);
                setTooltipVisible(true);
                
                // Position tooltip closer to cursor
                const svgRect = svgRef.current!.getBoundingClientRect();
                const mouseX = e.clientX - svgRect.left;
                const mouseY = e.clientY - svgRect.top;
                setTooltipPosition({ x: mouseX, y: mouseY - 30 });
              });
              
              path.addEventListener("mousemove", (e) => {
                if (!isMounted) return;
                // Update position as mouse moves, keeping tooltip closer to cursor
                const svgRect = svgRef.current!.getBoundingClientRect();
                const mouseX = e.clientX - svgRect.left;
                const mouseY = e.clientY - svgRect.top;
                setTooltipPosition({ x: mouseX, y: mouseY - 30 });
              });
              
              path.addEventListener("mouseleave", () => {
                if (!isMounted) return;
                if (selectedCountry !== countryName) {
                  path.setAttribute("filter", "none");
                  path.setAttribute("stroke-width", "0.525");
                }
                setHoveredCountry(null);
                setTooltipVisible(false);
              });

              // Add touch events for mobile devices
              path.addEventListener("touchstart", (e) => {
                if (!isMounted) return;
                e.preventDefault();
                path.setAttribute("filter", "drop-shadow(0 0 4px #ef4444)");
                path.setAttribute("stroke-width", "0.84");
                setHoveredCountry(countryName);
                setTooltipVisible(true);
                
                // Position tooltip at touch point
                const touch = e.touches[0];
                const svgRect = svgRef.current!.getBoundingClientRect();
                const touchX = touch.clientX - svgRect.left;
                const touchY = touch.clientY - svgRect.top;
                setTooltipPosition({ x: touchX, y: touchY - 30 });
              });
              
              path.addEventListener("touchmove", (e) => {
                if (!isMounted) return;
                e.preventDefault();
                // Update position as touch moves
                const touch = e.touches[0];
                const svgRect = svgRef.current!.getBoundingClientRect();
                const touchX = touch.clientX - svgRect.left;
                const touchY = touch.clientY - svgRect.top;
                setTooltipPosition({ x: touchX, y: touchY - 30 });
              });
              
              path.addEventListener("touchend", (e) => {
                if (!isMounted) return;
                e.preventDefault();
                
                // Handle country selection
                // Reset all countries
                const allPaths = svgRef.current?.querySelectorAll("path");
                allPaths?.forEach(p => {
                  p.setAttribute("fill", "#e5e7eb");
                  p.setAttribute("stroke-width", "0.525");
                });
                
                // Highlight selected country
                if (selectedCountry === countryName) {
                  setSelectedCountry(null);
                } else {
                  path.setAttribute("fill", "#005ac1");
                  path.setAttribute("stroke-width", "1.5");
                  setSelectedCountry(countryName);
                }
                
                // Keep tooltip visible for a moment
                setTimeout(() => {
                  if (!isMounted) return;
                  if (selectedCountry !== countryName) {
                    path.setAttribute("filter", "none");
                    path.setAttribute("stroke-width", "0.525");
                  }
                  setHoveredCountry(null);
                  setTooltipVisible(false);
                }, 1000); // Show tooltip for 1 second after touch
              });
              
              // Add click handler
              path.addEventListener("click", () => {
                if (!isMounted) return;
                // Reset all countries
                const allPaths = svgRef.current?.querySelectorAll("path");
                allPaths?.forEach(p => {
                  p.setAttribute("fill", "#e5e7eb");
                  p.setAttribute("stroke-width", "0.525");
                });
                
                // Highlight selected country
                if (selectedCountry === countryName) {
                  setSelectedCountry(null);
                } else {
                  path.setAttribute("fill", "#005ac1");
                  path.setAttribute("stroke-width", "1.5");
                  setSelectedCountry(countryName);
                }
              });


            }
            
            if (svgRef.current) {
              svgRef.current.appendChild(path);
            }
          } else if (feature.geometry.type === "MultiPolygon") {
            (feature.geometry.coordinates as Polygon[]).forEach((polygon: Polygon) => {
              if (!isMounted) return;
              
              const d = polygon
                .map((ring: Ring) =>
                  (ring as [number, number][])
                    .map(([lon, lat]: [number, number], i: number) => {
                      const [x, y] = projection([lon, lat])!;
                      return `${i === 0 ? "M" : "L"}${x},${y}`;
                    })
                    .join(" ") + "Z"
                )
                .join(" ");
              const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
              path.setAttribute("d", d);
              path.setAttribute("fill", isInteractive ? "#ef4444" : "#e5e7eb");
              path.setAttribute("stroke", "#000000");
              path.setAttribute("stroke-width", "0.525");
              path.setAttribute("data-country", countryName);
              
              if (isInteractive) {
                path.setAttribute("cursor", "pointer");
                
                // Add hover effects for mouse
                path.addEventListener("mouseenter", (e) => {
                  if (!isMounted) return;
                  path.setAttribute("filter", "drop-shadow(0 0 4px #ef4444)");
                  path.setAttribute("stroke-width", "0.84");
                  setHoveredCountry(countryName);
                  setTooltipVisible(true);
                  
                  // Position tooltip closer to cursor
                  const svgRect = svgRef.current!.getBoundingClientRect();
                  const mouseX = e.clientX - svgRect.left;
                  const mouseY = e.clientY - svgRect.top;
                  setTooltipPosition({ x: mouseX, y: mouseY - 30 });
                });
                
                path.addEventListener("mousemove", (e) => {
                  if (!isMounted) return;
                  // Update position as mouse moves, keeping tooltip closer to cursor
                  const svgRect = svgRef.current!.getBoundingClientRect();
                  const mouseX = e.clientX - svgRect.left;
                  const mouseY = e.clientY - svgRect.top;
                  setTooltipPosition({ x: mouseX, y: mouseY - 30 });
                });
                
                path.addEventListener("mouseleave", () => {
                  if (!isMounted) return;
                  if (selectedCountry !== countryName) {
                    path.setAttribute("filter", "none");
                    path.setAttribute("stroke-width", "0.525");
                  }
                  setHoveredCountry(null);
                  setTooltipVisible(false);
                });

                // Add touch events for mobile devices
                path.addEventListener("touchstart", (e) => {
                  if (!isMounted) return;
                  e.preventDefault();
                  path.setAttribute("filter", "drop-shadow(0 0 4px #ef4444)");
                  path.setAttribute("stroke-width", "0.84");
                  setHoveredCountry(countryName);
                  setTooltipVisible(true);
                  
                  // Position tooltip at touch point
                  const touch = e.touches[0];
                  const svgRect = svgRef.current!.getBoundingClientRect();
                  const touchX = touch.clientX - svgRect.left;
                  const touchY = touch.clientY - svgRect.top;
                  setTooltipPosition({ x: touchX, y: touchY - 30 });
                });
                
                path.addEventListener("touchmove", (e) => {
                  if (!isMounted) return;
                  e.preventDefault();
                  // Update position as touch moves
                  const touch = e.touches[0];
                  const svgRect = svgRef.current!.getBoundingClientRect();
                  const touchX = touch.clientX - svgRect.left;
                  const touchY = touch.clientY - svgRect.top;
                  setTooltipPosition({ x: touchX, y: touchY - 30 });
                });
                
                path.addEventListener("touchend", (e) => {
                  if (!isMounted) return;
                  e.preventDefault();
                  
                  // Handle country selection
                  // Reset all countries
                  const allPaths = svgRef.current?.querySelectorAll("path");
                  allPaths?.forEach(p => {
                    p.setAttribute("fill", "#e5e7eb");
                    p.setAttribute("stroke-width", "0.525");
                  });
                  
                  // Highlight selected country
                  if (selectedCountry === countryName) {
                    setSelectedCountry(null);
                  } else {
                    path.setAttribute("fill", "#005ac1");
                    path.setAttribute("stroke-width", "1.5");
                    setSelectedCountry(countryName);
                  }
                  
                  // Keep tooltip visible for a moment
                  setTimeout(() => {
                    if (!isMounted) return;
                    if (selectedCountry !== countryName) {
                      path.setAttribute("filter", "none");
                      path.setAttribute("stroke-width", "0.525");
                    }
                    setHoveredCountry(null);
                    setTooltipVisible(false);
                  }, 1000); // Show tooltip for 1 second after touch
                });
                
                // Add click handler
                path.addEventListener("click", () => {
                  if (!isMounted) return;
                  // Reset all countries
                  const allPaths = svgRef.current?.querySelectorAll("path");
                  allPaths?.forEach(p => {
                    p.setAttribute("fill", "#e5e7eb");
                    p.setAttribute("stroke-width", "0.525");
                  });
                  
                  // Highlight selected country
                  if (selectedCountry === countryName) {
                    setSelectedCountry(null);
                  } else {
                    path.setAttribute("fill", "#005ac1");
                    path.setAttribute("stroke-width", "1.5");
                    setSelectedCountry(countryName);
                  }
                });
              }
              
              if (svgRef.current) {
                svgRef.current.appendChild(path);
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error("Error loading map data:", error);
      });

    // Cleanup function
    return () => {
      isMounted = false;
      setHoveredCountry(null);
      setSelectedCountry(null);
    };
  }, [selectedCountry, mapDimensions]);

  return (
    <div className={styles.acrossWorldWrapper} style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center",
      width: "100%",
      textAlign: "center"
    }}>
      <h2 className={styles.acrossWorldHeading}>
        Across the world
      </h2>
      <p className={styles.acrossWorldSubtext}>
        Our premium plant process equipment is trusted and shipped across the globe, offering superior performance and dependability to industrial sectors everywhere.
      </p>
      <div style={{ 
        width: "100%", 
        maxWidth: `${mapDimensions.width}px`,
        minWidth: `${mapDimensions.width}px`,
        height: `${mapDimensions.height}px`, 
        minHeight: `${mapDimensions.height}px`,
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        margin: "2.2rem auto 0 auto",
        position: "relative",
        overflow: "hidden"
      }}>
        <svg ref={svgRef} width={mapDimensions.width} height={mapDimensions.height} style={{ 
          width: `${mapDimensions.width}px`, 
          height: `${mapDimensions.height}px`, 
          minWidth: `${mapDimensions.width}px`,
          minHeight: `${mapDimensions.height}px`,
          background: "#87CEEB", 
          borderRadius: "12px",
          flexShrink: 0
        }} />
        
        {/* Location Marker Tooltip */}
        {hoveredCountry && tooltipVisible && (
          <div style={{
            position: "absolute",
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: "translate(-50%, -100%)",
            zIndex: 1002,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: tooltipVisible ? 1 : 0,
            transition: "opacity 0.3s ease-out, transform 0.3s ease-out"
          }}>
            {/* Country Name */}
            <div style={{
              background: "white",
              color: "black",
              padding: "8px 12px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.2)",
              marginBottom: "8px"
            }}>
              {hoveredCountry}
            </div>
            
            {/* Location Marker (Triangle pointing down) */}
            <div style={{
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "12px solid white",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4)) drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
            }} />
          </div>
        )}
      </div>
      {selectedCountry && (
        <div style={{
          marginTop: "1rem",
          padding: "12px",
          background: "#005ac1",
          color: "white",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold"
        }}>
          Selected: {selectedCountry}
        </div>
      )}
    </div>
  );
} 